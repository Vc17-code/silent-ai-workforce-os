import { Router } from 'express';
import { db } from '../db.js';
import { hashPassword, signToken, verifyPassword, authMiddleware, AuthRequest } from '../middleware/auth.js';
import { validateAndConsumeKey } from '../services/registrationKeys.js';
import { getDemoUsage, isDemoUser } from '../services/demoLimits.js';
import { getClientIp } from '../utils/clientIp.js';
import { getSubscriptionStatus } from '../services/subscriptionService.js';
import { setUserTier } from '../services/subscriptionService.js';
import { User } from '../db.js';

const router = Router();

function toPublicUser(user: {
  id: number;
  email: string;
  name: string;
  account_type: string;
  subscription_tier: string;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    accountType: user.account_type as 'demo' | 'registered',
    subscriptionTier: user.subscription_tier as 'demo' | 'starter' | 'pro' | 'business',
  };
}

function authResponse(userId: number, req: { headers: Record<string, unknown>; socket: { remoteAddress?: string } }) {
  const user = db
    .prepare(
      `SELECT id, email, name, account_type, subscription_tier, subscription_expires_at,
              reports_this_month, reports_month_reset, created_at
       FROM users WHERE id = ?`
    )
    .get(userId) as User;

  const ip = getClientIp(req as never);
  return {
    token: signToken(user),
    user: toPublicUser(user),
    subscription: getSubscriptionStatus(user, ip),
    demoUsage: isDemoUser(user.email) ? getDemoUsage(ip) : undefined,
  };
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db
    .prepare(
      'SELECT id, email, name, password_hash, account_type, subscription_tier, created_at FROM users WHERE email = ?'
    )
    .get(email) as
    | {
        id: number;
        email: string;
        name: string;
        password_hash: string;
        account_type: string;
        subscription_tier: string;
        created_at: string;
      }
    | undefined;

  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json(authResponse(user.id, req));
});

router.post('/register', (req, res) => {
  const { email, password, name, accessKey } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (!accessKey) {
    return res.status(400).json({ error: 'A unique access key is required to register. Request one to get started.' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  let userId: number | undefined;
  try {
    const result = db
      .prepare(
        "INSERT INTO users (email, password_hash, name, account_type, subscription_tier) VALUES (?, ?, ?, 'registered', 'starter')"
      )
      .run(email, hashPassword(password), name);
    userId = Number(result.lastInsertRowid);
    validateAndConsumeKey(accessKey, userId);
    setUserTier(userId, 'starter', 1);
  } catch (err) {
    if (userId !== undefined) {
      db.prepare('DELETE FROM users WHERE id = ?').run(userId);
    }
    const message = err instanceof Error ? err.message : 'Registration failed';
    return res.status(400).json({ error: message });
  }

  res.status(201).json(authResponse(userId, req));
});

router.get('/me', authMiddleware, (req: AuthRequest, res) => {
  const user = req.user!;
  const ip = getClientIp(req);
  res.json({
    user: toPublicUser(user),
    subscription: getSubscriptionStatus(user, ip),
    demoUsage: isDemoUser(user.email) ? getDemoUsage(ip) : undefined,
  });
});

export default router;
