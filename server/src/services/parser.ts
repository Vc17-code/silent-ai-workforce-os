import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';

export interface ParsedData {
  columns: string[];
  rows: Record<string, string | number>[];
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

export function parseCSV(buffer: Buffer): ParsedData {
  const records = parse(buffer, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as Record<string, unknown>[];

  if (records.length === 0) {
    throw new Error('CSV file contains no data rows');
  }

  const columns = Object.keys(records[0]);
  const rows = records.map((r) => normalizeRow(r, columns));
  return { columns, rows };
}

export function parseXLSX(buffer: Buffer): ParsedData {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error('Excel file contains no sheets');
  }

  const sheet = workbook.Sheets[sheetName];
  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

  if (raw.length === 0) {
    throw new Error('Excel sheet contains no data rows');
  }

  const columns = Object.keys(raw[0]);
  const rows = raw.map((r) => normalizeRow(r, columns));
  return { columns, rows };
}

export function parseFile(buffer: Buffer, filename: string): ParsedData {
  const ext = filename.toLowerCase().split('.').pop();
  if (ext === 'csv') return parseCSV(buffer);
  if (ext === 'xlsx' || ext === 'xls') return parseXLSX(buffer);
  throw new Error('Unsupported file format. Please upload CSV or XLSX.');
}
