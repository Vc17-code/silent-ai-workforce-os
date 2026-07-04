import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { db, User } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ai-report-generator-demo-secret';

export interface AuthRequest extends Request {
  user?: User;
}

export function signToken(user: Pick<User, 'id' | 'email' | 'name' | 'account_type' | 'subscription_tier'>): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      accountType: user.account_type,
      subscriptionTier: user.subscription_tier,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { id: number };
    const user = db
      .prepare('SELECT id, email, name, account_type, subscription_tier, subscription_expires_at, reports_this_month, reports_month_reset, created_at FROM users WHERE id = ?')
      .get(payload.id) as User | undefined;
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}
