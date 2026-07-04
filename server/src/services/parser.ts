import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';
import { ALL_FORMATS, FileFormat, tierAllowsFormat, SubscriptionTier } from './subscriptions.js';

export interface ParsedData {
  columns: string[];
  rows: Record<string, string | number>[];
  sourceFormat?: string;
}

function normalizeRow(row: Record<string, unknown>, columns: string[]): Record<string, string | number> {
  const normalized: Record<string, string | number> = {};
  for (const col of columns) {
    const val = row[col];
    if (val === null || val === undefined || val === '') {
      normalized[col] = '';
    } else if (typeof val === 'number') {
      normalized[col] = val;
    } else {
      const num = Number(String(val).replace(/[$,%]/g, ''));
      normalized[col] = !isNaN(num) && String(val).match(/^[\d$,.%-]+$/) ? num : String(val);
    }
  }
  return normalized;
}

function rowsFromObjects(records: Record<string, unknown>[]): ParsedData {
  if (records.length === 0) throw new Error('File contains no data rows');
  const columns = Object.keys(records[0]);
  return { columns, rows: records.map((r) => normalizeRow(r, columns)) };
}

export function parseCSV(buffer: Buffer, delimiter = ','): ParsedData {
  const records = parse(buffer, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
    delimiter,
  }) as Record<string, unknown>[];
  return { ...rowsFromObjects(records), sourceFormat: delimiter === '\t' ? 'tsv' : 'csv' };
}

export function parseTSV(buffer: Buffer): ParsedData {
  return parseCSV(buffer, '\t');
}

export function parseJSON(buffer: Buffer): ParsedData {
  const text = buffer.toString('utf-8').trim();
  const data = JSON.parse(text) as unknown;

  let records: Record<string, unknown>[];
  if (Array.isArray(data)) {
    records = data as Record<string, unknown>[];
  } else if (data && typeof data === 'object' && Array.isArray((data as { data?: unknown }).data)) {
    records = (data as { data: Record<string, unknown>[] }).data;
  } else if (data && typeof data === 'object' && Array.isArray((data as { rows?: unknown }).rows)) {
    records = (data as { rows: Record<string, unknown>[] }).rows;
  } else {
    throw new Error('JSON must be an array of objects or contain a data/rows array');
  }

  return { ...rowsFromObjects(records), sourceFormat: 'json' };
}

export function parseXML(buffer: Buffer): ParsedData {
  const text = buffer.toString('utf-8');
  const rowMatches = [...text.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/gi)];
  if (rowMatches.length === 0) {
    throw new Error('XML must contain <row> elements with child fields');
  }

  const rows: Record<string, unknown>[] = rowMatches.map((match) => {
    const row: Record<string, unknown> = {};
    const fieldMatches = [...match[1].matchAll(/<([a-zA-Z0-9_-]+)[^>]*>([^<]*)<\/\1>/g)];
    for (const [, key, value] of fieldMatches) {
      row[key] = value.trim();
    }
    return row;
  });

  return { ...rowsFromObjects(rows), sourceFormat: 'xml' };
}

export function parseTXT(buffer: Buffer): ParsedData {
  const text = buffer.toString('utf-8');
  const firstLine = text.split(/\r?\n/)[0] ?? '';
  let delimiter = ',';
  if (firstLine.includes('\t')) delimiter = '\t';
  else if (firstLine.includes('|')) delimiter = '|';
  else if (firstLine.includes(';')) delimiter = ';';
  return { ...parseCSV(buffer, delimiter), sourceFormat: 'txt' };
}

export function parseSpreadsheet(buffer: Buffer, format: string): ParsedData {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error('Spreadsheet contains no sheets');

  const sheet = workbook.Sheets[sheetName];
  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });
  return { ...rowsFromObjects(raw), sourceFormat: format };
}

export function parseFile(buffer: Buffer, filename: string): ParsedData {
  const ext = (filename.toLowerCase().split('.').pop() ?? '') as FileFormat;
  switch (ext) {
    case 'csv':
      return parseCSV(buffer);
    case 'tsv':
      return parseTSV(buffer);
    case 'json':
      return parseJSON(buffer);
    case 'xml':
      return parseXML(buffer);
    case 'txt':
      return parseTXT(buffer);
    case 'xlsx':
    case 'xls':
    case 'ods':
      return parseSpreadsheet(buffer, ext);
    default:
      throw new Error(`Unsupported format ".${ext}". Supported: ${ALL_FORMATS.join(', ')}`);
  }
}

export function parseFileForTier(buffer: Buffer, filename: string, tier: SubscriptionTier): ParsedData {
  const ext = filename.toLowerCase().split('.').pop() ?? '';
  if (!tierAllowsFormat(tier, ext)) {
    throw new Error(`Your ${tier} plan does not support .${ext} files. Upgrade to unlock more formats.`);
  }
  return parseFile(buffer, filename);
}

export function getExtension(filename: string): string {
  return filename.toLowerCase().split('.').pop() ?? '';
}
