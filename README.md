# ReportAI — Business Report Micro App

A mobile-first micro app that transforms business data into AI-powered reports with subscription tiers, multi-format uploads, and WhatsApp passkey requests.

## Features

- **Micro-app UI** — Bottom navigation (Home, Upload, Plans, Account), PWA-ready
- **Multi-format uploads** — CSV, Excel, TSV, JSON, XML, ODS, TXT (by plan)
- **Subscription tiers** — Starter, Pro, Business with monthly limits
- **Passkey registration** — One-time keys for new accounts
- **Demo mode** — 3 reports per device IP + premium showcase
- **WhatsApp contact** — Clients request passkeys at **+61 432 751 093**
- **Exports** — PDF, Word, HTML (by plan)

## Subscription Plans

| Plan     | Reports/month | Upload formats                          | Exports        |
|----------|---------------|-----------------------------------------|----------------|
| Demo     | 3 per IP      | CSV, Excel                              | HTML           |
| Starter  | 20            | CSV, Excel, TSV                         | HTML           |
| Pro      | 100           | All formats                             | PDF, Word, HTML|
| Business | Unlimited     | All formats                             | PDF, Word, HTML|

## Quick Start

```bash
npm run install:all
npm run seed --prefix server
npm run dev          # local
npm run dev:mobile   # with public tunnel for phones
```

**Demo login:** demo@business.com / demo1234

## Passkeys & subscriptions

**Clients:** Request a passkey on WhatsApp: [+61 432 751 093](https://wa.me/61432751093)

**Admin — registration passkey:**
```bash
npm run generate-key --prefix server -- "Customer Name"
```

**Admin — subscription upgrade key:**
```bash
npm run generate-subscription-key --prefix server -- pro 1 "Customer Name"
```

Tiers: `starter`, `pro`, `business`

## Mobile access

```bash
npm run dev:mobile
```

Open the printed `https://*.trycloudflare.com` URL on your phone.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/register` | Register with passkey |
| GET | `/api/subscriptions/plans` | List plans |
| GET | `/api/subscriptions/status` | Current usage |
| POST | `/api/subscriptions/activate` | Activate subscription key |
| GET | `/api/reports/formats` | Allowed formats for user |
| POST | `/api/reports/upload` | Upload data file |
| GET | `/api/reports/:id/download/:format` | Export report |

## Production

```bash
npm run build
npm start
```
