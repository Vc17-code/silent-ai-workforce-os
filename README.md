# Smilecare Dentist — Premium Dental Clinic Website

Enterprise-grade website for **Smilecare Dentist**, Vashi, Navi Mumbai — built for trust, education, and appointment conversion.

## Features

### Public website
- Premium full-bleed hero with brand-first composition
- Clinic introduction, doctor highlight, why-choose-us
- Featured treatments with dedicated detail pages (overview, benefits, procedure, recovery, FAQs)
- Patient testimonials + Google review stats
- Smile gallery with before/after and lightbox
- 360° virtual tour placeholder (Matterport / Pannellum / Marzipano ready)
- Introductory video placeholder (admin-uploadable)
- Contact experience with dialer, WhatsApp, email, Maps
- Appointment booking form with validation
- Floating Call / WhatsApp / Book actions + mobile sticky bar
- Exit-intent booking prompt (desktop)
- Emergency contact banner + insurance trust signals
- SEO: Dentist/MedicalBusiness schema, Open Graph, sitemap, robots.txt

### Owner dashboard (`/owner/login`)
- Secure password login
- Appointments management
- Treatments, gallery, testimonials CMS
- Doctor profile, FAQs, offers
- Video & 360° tour media settings
- SEO & about content editor
- Image upload API

## Tech stack
- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4
- React Hook Form + Zod
- JSON file storage (Supabase-ready architecture)

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`

### Owner login
- URL: `/owner/login`
- Default password: `smilecare2024` (set `OWNER_PASSWORD` in `.env.local`)

## Business details

| Field | Value |
|-------|-------|
| Name | Smilecare Dentist |
| Location | Sector 17, Vashi, Navi Mumbai |
| Phone | +91 22 4123 4567 |
| Emergency | +91 98765 43210 |
| Email | hello@smilecarenavimumbai.com |
| Hours | Mon–Sat 10AM–8PM, Sun 10AM–2PM |
| Doctor | Dr. Ananya Mehta, BDS, MDS |

## Future modules (architecture-ready)
Patient portal, teleconsultation, digital prescriptions, online payments, AI chatbot, smile simulator, multi-branch, CRM, analytics.
