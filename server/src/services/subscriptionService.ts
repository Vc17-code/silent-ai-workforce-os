import { db, User } from '../db.js';
import {
  getPlanForTier,
  SubscriptionTier,
  SUBSCRIPTION_PLANS,
  DEMO_PLAN,
} from './subscriptions.js';
import { isDemoUser, getDemoUsage, assertDemoCanCreateReport, DEMO_REPORT_LIMIT } from './demoLimits.js';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  planName: string;
  reportsUsed: number;
  reportsLimit: number | null;
  reportsRemaining: number | null;
  formats: string[];
  exports: string[];
  expiresAt: string | null;
  canCreateReport: boolean;
}

interface UserSubscriptionRow {
  subscription_tier: SubscriptionTier;
  subscription_expires_at: string | null;
  reports_this_month: number;
  reports_month_reset: string | null;
}

function currentMonthKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

function resetMonthlyUsageIfNeeded(userId: number, row: UserSubscriptionRow): number {
  const month = currentMonthKey();
  if (row.reports_month_reset !== month) {
    db.prepare(
      `UPDATE users SET reports_this_month = 0, reports_month_reset = ? WHERE id = ?`
    ).run(month, userId);
    return 0;
  }
  return row.reports_this_month;
}

export function getUserSubscriptionRow(userId: number): UserSubscriptionRow {
  return db
    .prepare(
      `SELECT subscription_tier, subscription_expires_at, reports_this_month, reports_month_reset
       FROM users WHERE id = ?`
    )
    .get(userId) as UserSubscriptionRow;
}

export function getEffectiveTier(user: User): SubscriptionTier {
  if (isDemoUser(user.email)) return 'demo';
  const row = getUserSubscriptionRow(user.id);
  if (row.subscription_expires_at) {
    const expired = new Date(row.subscription_expires_at) < new Date();
    if (expired && row.subscription_tier !== 'starter') {
      return 'starter';
    }
  }
  return row.subscription_tier ?? 'starter';
}

export function getSubscriptionStatus(user: User, ipAddress?: string): SubscriptionStatus {
  const tier = getEffectiveTier(user);
  const plan = getPlanForTier(tier);
  const row = getUserSubscriptionRow(user.id);
  const reportsUsed = isDemoUser(user.email) && ipAddress
    ? getDemoUsage(ipAddress).used
    : resetMonthlyUsageIfNeeded(user.id, row);

  const reportsLimit = isDemoUser(user.email) ? DEMO_REPORT_LIMIT : plan.reportsPerMonth;
  const reportsRemaining =
    reportsLimit === null ? null : Math.max(0, reportsLimit - reportsUsed);

  return {
    tier,
    planName: plan.name,
    reportsUsed,
    reportsLimit,
    reportsRemaining,
    formats: plan.formats,
    exports: plan.exports,
    expiresAt: row.subscription_expires_at,
    canCreateReport: reportsRemaining === null || reportsRemaining > 0,
  };
}

export function assertCanCreateReport(user: User, ipAddress: string): void {
  if (isDemoUser(user.email)) {
    assertDemoCanCreateReport(ipAddress);
    return;
  }

  const status = getSubscriptionStatus(user);
  if (!status.canCreateReport) {
    throw new Error(
      `Monthly report limit reached (${status.reportsLimit}). Upgrade your plan for more reports.`
    );
  }
}

export function recordReportUsage(user: User): void {
  if (isDemoUser(user.email)) return;
  const month = currentMonthKey();
  db.prepare(
    `UPDATE users SET
      reports_this_month = CASE WHEN reports_month_reset = ? THEN reports_this_month + 1 ELSE 1 END,
      reports_month_reset = ?
     WHERE id = ?`
  ).run(month, month, user.id);
}

export function setUserTier(userId: number, tier: SubscriptionTier, months = 1): void {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + months);
  db.prepare(
    `UPDATE users SET subscription_tier = ?, subscription_expires_at = ?, account_type = 'registered' WHERE id = ?`
  ).run(tier, expires.toISOString(), userId);
}

export function listPlans() {
  return {
    demo: DEMO_PLAN,
    plans: Object.values(SUBSCRIPTION_PLANS),
  };
}
