import { Router } from 'express';
import { db } from '../db.js';
import { hashPassword, signToken, verifyPassword, authMiddleware, AuthRequest } from '../middleware/auth.js';
import { validateAndConsumeKey } from '../services/registrationKeys.js';
import { getDemoUsage, isDemoUser } from '../services/demoLimits.js';
import { getClientIp } from '../utils/clientIp.js';

const router = Router();

function toPublicUser(user: { id: number; email: string; name: string; account_type: string }) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    accountType: user.account_type as 'demo' | 'registered',
  };
}

function authResponse(user: { id: number; email: string; name: string; account_type: string }, req: { headers: Record<string, unknown>; socket: { remoteAddress?: string } }) {
  const publicUser = toPublicUser(user);
  const token = signToken(user);
  const payload: {
    token: string;
    user: ReturnType<typeof toPublicUser>;
    demoUsage?: ReturnType<typeof getDemoUsage>;
  } = { token, user: publicUser };

  if (isDemoUser(user.email)) {
    payload.demoUsage = getDemoUsage(getClientIp(req as never));
  }

  return payload;
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db.prepare('SELECT id, email, name, password_hash, account_type, created_at FROM users WHERE email = ?').get(email) as
    | { id: number; email: string; name: string; password_hash: string; account_type: string; created_at: string }
    | undefined;

  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json(authResponse(user, req));
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
      .prepare("INSERT INTO users (email, password_hash, name, account_type) VALUES (?, ?, ?, 'registered')")
      .run(email, hashPassword(password), name);
    userId = Number(result.lastInsertRowid);
    validateAndConsumeKey(accessKey, userId);
  } catch (err) {
    if (userId !== undefined) {
      db.prepare('DELETE FROM users WHERE id = ?').run(userId);
    }
    const message = err instanceof Error ? err.message : 'Registration failed';
    return res.status(400).json({ error: message });
  }

  const user = db.prepare('SELECT id, email, name, account_type, created_at FROM users WHERE id = ?').get(userId) as {
    id: number;
    email: string;
    name: string;
    account_type: string;
    created_at: string;
  };

  res.status(201).json(authResponse(user, req));
});

router.get('/me', authMiddleware, (req: AuthRequest, res) => {
  const user = req.user!;
  const payload: {
    user: ReturnType<typeof toPublicUser>;
    demoUsage?: ReturnType<typeof getDemoUsage>;
  } = { user: toPublicUser(user) };

  if (isDemoUser(user.email)) {
    payload.demoUsage = getDemoUsage(getClientIp(req));
  }

  res.json(payload);
});

export default router;
