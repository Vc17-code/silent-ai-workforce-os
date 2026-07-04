import bcrypt from 'bcryptjs';
import { db } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseFile } from './services/parser.js';
import { generateShowcaseAnalysis } from './services/showcaseAnalysis.js';

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
  db.prepare("UPDATE users SET account_type = 'demo' WHERE id = ?").run(userId);
  console.log('Demo user already exists');
} else {
  const result = db
    .prepare("INSERT INTO users (email, password_hash, name, account_type) VALUES (?, ?, ?, 'demo')")
    .run(demoUser.email, bcrypt.hashSync(demoUser.password, 10), demoUser.name);
  userId = Number(result.lastInsertRowid);
  console.log('Created demo user:', demoUser.email);
}

const samplePath = path.join(__dirname, 'data', 'sample-business-data.csv');
if (fs.existsSync(samplePath)) {
  const showcase = db
    .prepare('SELECT id FROM reports WHERE user_id = ? AND is_showcase = 1')
    .get(userId) as { id: number } | undefined;

  if (!showcase) {
    db.prepare('DELETE FROM reports WHERE user_id = ?').run(userId);

    const buffer = fs.readFileSync(samplePath);
    const parsed = parseFile(buffer, 'sample-business-data.csv');
    const title = 'Executive Performance Overview — Premium Sample';
    const analysis = generateShowcaseAnalysis(parsed, title);

    db.prepare(
      `INSERT INTO reports (user_id, title, filename, row_count, columns_json, data_json, analysis_json, is_showcase)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`
    ).run(
      userId,
      title,
      'sample-business-data.csv',
      parsed.rows.length,
      JSON.stringify(parsed.columns),
      JSON.stringify(parsed.rows),
      JSON.stringify(analysis)
    );
    console.log('Seeded premium showcase report');
  }
}

console.log('\nDemo credentials:');
console.log('  Email:    demo@business.com');
console.log('  Password: demo1234');
console.log('  Limit:    3 new reports per device IP');
console.log('\nGenerate registration keys with: npm run generate-key --prefix server');
