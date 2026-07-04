import { Router, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, ReportRow } from '../db.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { parseFileForTier } from '../services/parser.js';
import { generateAnalysis, Analysis } from '../services/analyzer.js';
import { generateHTML, generatePDF, generateDOCX } from '../services/exporter.js';
import { isDemoUser, recordDemoReport } from '../services/demoLimits.js';
import { getClientIp } from '../utils/clientIp.js';
import {
  assertCanCreateReport,
  getEffectiveTier,
  getSubscriptionStatus,
  recordReportUsage,
} from '../services/subscriptionService.js';
import { tierAllowsExport } from '../services/subscriptions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });
const router = Router();

router.use(authMiddleware);

function createReportResponse(
  req: AuthRequest,
  res: Response,
  build: () => { id: number; title: string; filename: string; rowCount: number; analysis: Analysis }
) {
  try {
    const ip = getClientIp(req);
    assertCanCreateReport(req.user!, ip);
    const payload = build();

    if (isDemoUser(req.user!.email)) {
      recordDemoReport(ip);
    } else {
      recordReportUsage(req.user!);
    }

    res.status(201).json({
      ...payload,
      createdAt: new Date().toISOString(),
      subscription: getSubscriptionStatus(req.user!, ip),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Request failed';
    const isLimit = message.includes('limit') || message.includes('Demo') || message.includes('plan');
    res.status(isLimit ? 403 : 400).json({ error: message });
  }
}

router.get('/', (req: AuthRequest, res) => {
  const reports = db
    .prepare(
      `SELECT id, title, filename, row_count, created_at, is_showcase,
        json_extract(analysis_json, '$.executiveSummary') as summary_preview
       FROM reports WHERE user_id = ? ORDER BY is_showcase DESC, created_at DESC LIMIT 20`
    )
    .all(req.user!.id);

  res.json(reports);
});

router.get('/formats', (req: AuthRequest, res) => {
  const status = getSubscriptionStatus(req.user!, getClientIp(req));
  res.json({ tier: status.tier, formats: status.formats, exports: status.exports });
});

router.get('/sample', (_req, res) => {
  const samplePath = path.join(__dirname, '..', 'data', 'sample-business-data.csv');
  if (!fs.existsSync(samplePath)) {
    return res.status(404).json({ error: 'Sample data not found' });
  }
  res.download(samplePath, 'sample-business-data.csv');
});

router.get('/:id', (req: AuthRequest, res) => {
  const report = db
    .prepare('SELECT * FROM reports WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id) as ReportRow | undefined;

  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  res.json({
    id: report.id,
    title: report.title,
    filename: report.filename,
    rowCount: report.row_count,
    columns: JSON.parse(report.columns_json),
    data: JSON.parse(report.data_json),
    analysis: JSON.parse(report.analysis_json) as Analysis,
    createdAt: report.created_at,
    isShowcase: Boolean(report.is_showcase),
  });
});

router.post('/upload', upload.single('file'), (req: AuthRequest, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const tier = getEffectiveTier(req.user!);
  const title = req.body.title || req.file.originalname.replace(/\.[^.]+$/, '');

  createReportResponse(req, res, () => {
    const parsed = parseFileForTier(req.file!.buffer, req.file!.originalname, tier);
    const analysis = generateAnalysis(parsed, title);

    const result = db
      .prepare(
        `INSERT INTO reports (user_id, title, filename, row_count, columns_json, data_json, analysis_json, is_showcase)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0)`
      )
      .run(
        req.user!.id,
        title,
        req.file!.originalname,
        parsed.rows.length,
        JSON.stringify(parsed.columns),
        JSON.stringify(parsed.rows),
        JSON.stringify(analysis)
      );

    return {
      id: Number(result.lastInsertRowid),
      title,
      filename: req.file!.originalname,
      rowCount: parsed.rows.length,
      analysis,
    };
  });
});

router.post('/sample/generate', (req: AuthRequest, res) => {
  createReportResponse(req, res, () => {
    const samplePath = path.join(__dirname, '..', 'data', 'sample-business-data.csv');
    const buffer = fs.readFileSync(samplePath);
    const tier = getEffectiveTier(req.user!);
    const parsed = parseFileForTier(buffer, 'sample-business-data.csv', tier);
    const title = 'Q4 2025 Business Performance';
    const analysis = generateAnalysis(parsed, title);

    const result = db
      .prepare(
        `INSERT INTO reports (user_id, title, filename, row_count, columns_json, data_json, analysis_json, is_showcase)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0)`
      )
      .run(
        req.user!.id,
        title,
        'sample-business-data.csv',
        parsed.rows.length,
        JSON.stringify(parsed.columns),
        JSON.stringify(parsed.rows),
        JSON.stringify(analysis)
      );

    return {
      id: Number(result.lastInsertRowid),
      title,
      filename: 'sample-business-data.csv',
      rowCount: parsed.rows.length,
      analysis,
    };
  });
});

router.get('/:id/download/:format', async (req: AuthRequest, res) => {
  const report = db
    .prepare('SELECT * FROM reports WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id) as ReportRow | undefined;

  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  const tier = getEffectiveTier(req.user!);
  const format = String(req.params.format).toLowerCase();
  if (!tierAllowsExport(tier, format)) {
    return res.status(403).json({
      error: `Your ${tier} plan does not include ${format.toUpperCase()} export. Upgrade to unlock.`,
    });
  }

  const analysis = JSON.parse(report.analysis_json) as Analysis;
  const safeTitle = report.title.replace(/[^a-zA-Z0-9-_ ]/g, '').trim();

  try {
    if (format === 'html') {
      const html = generateHTML(report.title, analysis, report.created_at);
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.html"`);
      return res.send(html);
    }

    if (format === 'pdf') {
      const pdf = await generatePDF(report.title, analysis, report.created_at);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.pdf"`);
      return res.send(pdf);
    }

    if (format === 'docx' || format === 'word') {
      const docx = await generateDOCX(report.title, analysis, report.created_at);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.docx"`);
      return res.send(docx);
    }

    res.status(400).json({ error: 'Unsupported format. Use pdf, docx, or html.' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Export failed';
    res.status(500).json({ error: message });
  }
});

router.delete('/:id', (req: AuthRequest, res) => {
  const report = db
    .prepare('SELECT is_showcase FROM reports WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user!.id) as { is_showcase: number } | undefined;

  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  if (isDemoUser(req.user!.email) && report.is_showcase) {
    return res.status(403).json({ error: 'Showcase reports cannot be deleted in demo mode.' });
  }

  db.prepare('DELETE FROM reports WHERE id = ? AND user_id = ?').run(req.params.id, req.user!.id);
  res.json({ success: true });
});

export default router;
