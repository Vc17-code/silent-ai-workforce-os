# Disha Properties — Premium Real Estate Website

A premium, conversion-focused real estate website for **Disha Properties**, trusted real estate experts in Makarwali, Ajmer with 16+ years of experience.

## Features

### Public Website
- Fullscreen hero with statistics and CTAs
- Featured properties with dynamic cards
- Property categories, services, and process timeline
- Customer testimonials and FAQ with schema markup
- Contact form with inquiry capture
- Property gallery with filters and lightbox
- Individual property detail pages with gallery, map, and inquiry form
- Floating WhatsApp and call buttons
- SEO: OpenGraph, Twitter Cards, LocalBusiness schema, sitemap, robots.txt

### Owner Dashboard (Premium)
- Secure password-protected login at `/owner/login`
- Dashboard with analytics overview
- Add, edit, and delete property listings
- Upload images to server
- Feature listings, hide listings, mark sold/rented
- Manage customer inquiries
- Properties appear instantly on the public site

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Forms:** React Hook Form + Zod validation
- **Storage:** JSON file-based (development); Supabase-ready architecture
- **Hosting:** Vercel (recommended)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Owner Login
- URL: `http://localhost:3000/owner/login`
- Default password: `disha2024` (set `OWNER_PASSWORD` in `.env.local`)

## Project Structure

```
/app
  /(marketing)          # Public pages with navbar/footer
    page.tsx            # Homepage
    /properties         # Property listings & detail pages
    /about, /services, /contact, /gallery
  /owner
    /login              # Owner authentication
    /(panel)            # Protected dashboard routes
      /dashboard
      /listings
      /enquiries
      /settings
  /api                  # REST API routes
/components             # Reusable UI components
/lib                    # Config, database, auth, SEO, utils
/types                  # TypeScript interfaces
/data                   # JSON data store (properties, inquiries)
/public/uploads         # Uploaded property images
```

## Business Details

| Field | Value |
|-------|-------|
| Business Name | Disha Properties |
| Phone | +91 94144 35920 |
| Email | info@dishapropertiesajmer.in |
| Address | S8 G Block, Oppo First Step School, Makadwali Road, Makarwali, Ajmer-305004, Rajasthan |
| Service Area | Makarwali, Vaishali Nagar, Ajmer City |
| Hours | Mon–Sat 10AM–7PM, Sun 10AM–5PM |
| Experience | 16+ Years |
| Primary Color | Deep Royal Blue (#1E3A8A) |
| Secondary | Emerald Green (#10B981) |
| Accent | Gold (#F59E0B) |

## Deploy to Vercel

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL` — your production domain
   - `OWNER_PASSWORD` — secure owner password
4. Deploy

## Plans

| Feature | Free | Premium |
|---------|------|---------|
| Property listings | 1 (managed by agency) | Unlimited |
| Image uploads | ✓ | Unlimited |
| Owner dashboard | — | ✓ |
| Featured properties | — | ✓ |
| Lead management | — | ✓ |
| Video uploads | — | ✓ |

## License

Proprietary — Built for Disha Properties.
