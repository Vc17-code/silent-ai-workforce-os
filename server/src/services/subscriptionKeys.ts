import crypto from 'crypto';
import { db } from '../db.js';
import { SubscriptionTier } from './subscriptions.js';
import { setUserTier } from './subscriptionService.js';

export interface SubscriptionKey {
  id: number;
  key: string;
  tier: SubscriptionTier;
  duration_months: number;
  used_by_user_id: number | null;
  used_at: string | null;
  created_at: string;
  note: string | null;
}

const VALID_TIERS = new Set(['starter', 'pro', 'business']);

export function generateSubscriptionKey(tier: SubscriptionTier, months = 1, note?: string): string {
  if (!VALID_TIERS.has(tier)) {
    throw new Error('Tier must be starter, pro, or business');
  }
  const segments = Array.from({ length: 3 }, () =>
    crypto.randomBytes(2).toString('hex').toUpperCase()
  );
  const key = `SUB-${tier.toUpperCase().slice(0, 3)}-${segments.join('-')}`;

  db.prepare(
    'INSERT INTO subscription_keys (key, tier, duration_months, note) VALUES (?, ?, ?, ?)'
  ).run(key, tier, months, note ?? null);

  return key;
}

export function normalizeSubKey(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, '');
}

export function activateSubscriptionKey(keyInput: string, userId: number): SubscriptionTier {
  const key = normalizeSubKey(keyInput);
  const row = db
    .prepare('SELECT id, tier, duration_months, used_by_user_id FROM subscription_keys WHERE key = ?')
    .get(key) as { id: number; tier: SubscriptionTier; duration_months: number; used_by_user_id: number | null } | undefined;

  if (!row) throw new Error('Invalid subscription key.');
  if (row.used_by_user_id !== null) throw new Error('This subscription key has already been used.');

  setUserTier(userId, row.tier, row.duration_months);
  db.prepare(
    `UPDATE subscription_keys SET used_by_user_id = ?, used_at = datetime('now') WHERE id = ?`
  ).run(userId, row.id);

  return row.tier;
}
