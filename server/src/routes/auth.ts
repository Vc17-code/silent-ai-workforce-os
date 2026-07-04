import { Router } from 'express';
import { db } from '../db.js';
import { hashPassword, signToken, verifyPassword } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db.prepare('SELECT id, email, name, password_hash, created_at FROM users WHERE email = ?').get(email) as
    | { id: number; email: string; name: string; password_hash: string; created_at: string }
    | undefined;

  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = signToken(user);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const result = db
    .prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)')
    .run(email, hashPassword(password), name);

  const user = { id: Number(result.lastInsertRowid), email, name };
  const token = signToken({ ...user, created_at: new Date().toISOString() });
  res.status(201).json({ token, user });
});

export default router;
