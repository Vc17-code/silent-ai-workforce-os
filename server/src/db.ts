import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.join(dataDir, 'reports.db');

export const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    account_type TEXT NOT NULL DEFAULT 'registered',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    filename TEXT NOT NULL,
    row_count INTEGER NOT NULL,
    columns_json TEXT NOT NULL,
    data_json TEXT NOT NULL,
    analysis_json TEXT NOT NULL,
    is_showcase INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS registration_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    used_by_user_id INTEGER,
    used_at TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    note TEXT,
    FOREIGN KEY (used_by_user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS demo_ip_usage (
    ip_address TEXT PRIMARY KEY,
    report_count INTEGER NOT NULL DEFAULT 0,
    first_used_at TEXT DEFAULT (datetime('now')),
    last_used_at TEXT DEFAULT (datetime('now'))
  );
`);

const userColumns = db.prepare("PRAGMA table_info(users)").all() as { name: string }[];
if (!userColumns.some((c) => c.name === 'account_type')) {
  db.exec("ALTER TABLE users ADD COLUMN account_type TEXT NOT NULL DEFAULT 'registered'");
}
if (!userColumns.some((c) => c.name === 'subscription_tier')) {
  db.exec("ALTER TABLE users ADD COLUMN subscription_tier TEXT NOT NULL DEFAULT 'starter'");
}
if (!userColumns.some((c) => c.name === 'subscription_expires_at')) {
  db.exec('ALTER TABLE users ADD COLUMN subscription_expires_at TEXT');
}
if (!userColumns.some((c) => c.name === 'reports_this_month')) {
  db.exec('ALTER TABLE users ADD COLUMN reports_this_month INTEGER NOT NULL DEFAULT 0');
}
if (!userColumns.some((c) => c.name === 'reports_month_reset')) {
  db.exec('ALTER TABLE users ADD COLUMN reports_month_reset TEXT');
}

db.exec(`
  CREATE TABLE IF NOT EXISTS subscription_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    tier TEXT NOT NULL,
    duration_months INTEGER NOT NULL DEFAULT 1,
    used_by_user_id INTEGER,
    used_at TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    note TEXT,
    FOREIGN KEY (used_by_user_id) REFERENCES users(id)
  );
`);

const reportColumns = db.prepare("PRAGMA table_info(reports)").all() as { name: string }[];
if (!reportColumns.some((c) => c.name === 'is_showcase')) {
  db.exec('ALTER TABLE reports ADD COLUMN is_showcase INTEGER NOT NULL DEFAULT 0');
}

export interface User {
  id: number;
  email: string;
  name: string;
  account_type: 'demo' | 'registered';
  subscription_tier: 'demo' | 'starter' | 'pro' | 'business';
  subscription_expires_at: string | null;
  reports_this_month: number;
  reports_month_reset: string | null;
  created_at: string;
}

export interface ReportRow {
  id: number;
  user_id: number;
  title: string;
  filename: string;
  row_count: number;
  columns_json: string;
  data_json: string;
  analysis_json: string;
  is_showcase: number;
  created_at: string;
}
