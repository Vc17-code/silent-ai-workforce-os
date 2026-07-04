import bcrypt from 'bcryptjs';
import { db } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseFile } from './services/parser.js';
import { generateAnalysis } from './services/analyzer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const demoUser = {
  email: 'demo@business.com',
  password: 'demo1234',
  name: 'Alex Morgan',
};

const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(demoUser.email) as { id: number } | undefined;

let userId: number;
if (existing) {
  userId = existing.id;
  console.log('Demo user already exists');
} else {
  const result = db
    .prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)')
    .run(demoUser.email, bcrypt.hashSync(demoUser.password, 10), demoUser.name);
  userId = Number(result.lastInsertRowid);
  console.log('Created demo user:', demoUser.email);
}

const samplePath = path.join(__dirname, 'data', 'sample-business-data.csv');
if (fs.existsSync(samplePath)) {
  const reportCount = db.prepare('SELECT COUNT(*) as count FROM reports WHERE user_id = ?').get(userId) as { count: number };
  if (reportCount.count === 0) {
    const buffer = fs.readFileSync(samplePath);
    const parsed = parseFile(buffer, 'sample-business-data.csv');
    const titles = ['Q3 2025 Sales Review', 'Annual Contractor Performance', 'Consulting Revenue Analysis'];

    for (const title of titles) {
      const analysis = generateAnalysis(parsed, title);
      db.prepare(
        `INSERT INTO reports (user_id, title, filename, row_count, columns_json, data_json, analysis_json)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).run(
        userId,
        title,
        'sample-business-data.csv',
        parsed.rows.length,
        JSON.stringify(parsed.columns),
        JSON.stringify(parsed.rows),
        JSON.stringify(analysis)
      );
    }
    console.log('Seeded sample reports');
  }
}

console.log('\nDemo credentials:');
console.log('  Email:    demo@business.com');
console.log('  Password: demo1234');
