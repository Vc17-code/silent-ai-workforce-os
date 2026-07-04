import { db } from '../db.js';

export const DEMO_REPORT_LIMIT = 3;
export const DEMO_EMAIL = 'demo@business.com';

export interface DemoUsage {
  used: number;
  limit: number;
  remaining: number;
}

export function isDemoUser(email: string): boolean {
  return email.toLowerCase() === DEMO_EMAIL;
}

export function getDemoUsage(ipAddress: string): DemoUsage {
  const row = db
    .prepare('SELECT report_count FROM demo_ip_usage WHERE ip_address = ?')
    .get(ipAddress) as { report_count: number } | undefined;

  const used = row?.report_count ?? 0;
  return {
    used,
    limit: DEMO_REPORT_LIMIT,
    remaining: Math.max(0, DEMO_REPORT_LIMIT - used),
  };
}

export function assertDemoCanCreateReport(ipAddress: string): void {
  const usage = getDemoUsage(ipAddress);
  if (usage.remaining <= 0) {
    throw new Error(
      `Demo limit reached (${DEMO_REPORT_LIMIT} reports per device). Register with an access key for unlimited reports.`
    );
  }
}

export function recordDemoReport(ipAddress: string): DemoUsage {
  db.prepare(
    `INSERT INTO demo_ip_usage (ip_address, report_count, first_used_at, last_used_at)
     VALUES (?, 1, datetime('now'), datetime('now'))
     ON CONFLICT(ip_address) DO UPDATE SET
       report_count = report_count + 1,
       last_used_at = datetime('now')`
  ).run(ipAddress);

  return getDemoUsage(ipAddress);
}
