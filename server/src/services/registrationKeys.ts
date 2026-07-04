import crypto from 'crypto';
import { db } from '../db.js';

export interface RegistrationKey {
  id: number;
  key: string;
  used_by_user_id: number | null;
  used_at: string | null;
  created_at: string;
  note: string | null;
}

export function generateRegistrationKey(note?: string): string {
  const segments = Array.from({ length: 3 }, () =>
    crypto.randomBytes(2).toString('hex').toUpperCase()
  );
  const key = `AIRG-${segments.join('-')}`;

  db.prepare('INSERT INTO registration_keys (key, note) VALUES (?, ?)').run(key, note ?? null);
  return key;
}

export function normalizeKey(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, '');
}

export function validateAndConsumeKey(keyInput: string, userId: number): void {
  const key = normalizeKey(keyInput);
  const row = db
    .prepare('SELECT id, used_by_user_id FROM registration_keys WHERE key = ?')
    .get(key) as { id: number; used_by_user_id: number | null } | undefined;

  if (!row) {
    throw new Error('Invalid access key. Request a unique key to register.');
  }
  if (row.used_by_user_id !== null) {
    throw new Error('This access key has already been used.');
  }

  db.prepare(
    `UPDATE registration_keys SET used_by_user_id = ?, used_at = datetime('now') WHERE id = ?`
  ).run(userId, row.id);
}

export function listKeys(): RegistrationKey[] {
  return db
    .prepare(
      `SELECT id, key, used_by_user_id, used_at, created_at, note
       FROM registration_keys ORDER BY created_at DESC`
    )
    .all() as RegistrationKey[];
}
