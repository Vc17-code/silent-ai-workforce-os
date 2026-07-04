# AI Report Generator

A modern web application that transforms Excel and CSV business data into professional AI-powered reports with insights, charts, and multi-format exports.

## Features

- **Dashboard** — Drag-and-drop upload, sample dataset, recent reports
- **File Support** — CSV and XLSX uploads
- **AI Analysis** — Executive summary, key numbers, business insights, growth opportunities, risks, and recommendations
- **Visual Charts** — Interactive bar, line, and doughnut charts via Chart.js
- **Export** — Download reports as PDF, Word (.docx), or HTML
- **Authentication** — Simple login with local SQLite database
- **Design** — Glassmorphism UI, responsive, premium minimal aesthetic

## Tech Stack

| Layer    | Technologies                          |
|----------|---------------------------------------|
| Frontend | React, TypeScript, Tailwind CSS, Chart.js |
| Backend  | Node.js, Express, TypeScript          |
| Database | SQLite (better-sqlite3)               |

## Quick Start

```bash
# Install dependencies
npm run install:all

# Seed demo data
npm run seed --prefix server

# Start development servers (API on :3001, UI on :5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and sign in with:

- **Email:** demo@business.com
- **Password:** demo1234

## Project Structure

```
├── client/          # React frontend (Vite)
├── server/          # Express API + SQLite
│   └── src/data/    # Sample business dataset
└── package.json     # Root scripts
```

## API Endpoints

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| POST   | `/api/auth/login`               | Sign in                  |
| POST   | `/api/auth/register`            | Create account           |
| GET    | `/api/reports`                  | List recent reports      |
| POST   | `/api/reports/upload`           | Upload CSV/XLSX          |
| POST   | `/api/reports/sample/generate`  | Generate from sample data|
| GET    | `/api/reports/:id`              | Get report details       |
| GET    | `/api/reports/:id/download/:format` | Export PDF/Word/HTML |

## Production Build

```bash
npm run build
npm start
```

The server serves the built frontend from `client/dist`.
