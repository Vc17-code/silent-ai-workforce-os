# Disha Properties — Local Business Website

A clean, fast, mobile-responsive static website for **Disha Properties**, a real estate and construction business serving **Ajmer, Makarwali, and Vaishali Nagar, Rajasthan**.

## Pages

| Page | File |
|------|------|
| Homepage | `index.html` |
| Residential Properties | `services/residential-properties.html` |
| Commercial Real Estate | `services/commercial-real-estate.html` |
| Bungalows & Building Properties | `services/bungalows-building-properties.html` |
| Contact | `contact.html` |

## Quick Start

Open `index.html` in a browser, or serve locally:

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`

## Business Details

| Field | Value |
|-------|-------|
| Business Name | Disha Properties |
| Phone | +91 94144 35920 |
| Email | info@dishapropertiesajmer.in |
| Address | S8 G Block, Oppo First Step School, Makadwali Road, Makarwali, Ajmer-305004, Rajasthan |
| Service Area | Makarwali, Vaishali Nagar, Ajmer City |
| Hours | Mon–Sat 10AM–7PM, Sun 10AM–5PM |
| Colors | Navy Blue (`#0a2540`) + Orange (`#f97316`) — edit `css/styles.css` `:root` |

## Features

- Mobile-responsive layout with hamburger navigation
- Click-to-call phone CTAs throughout
- Lead-generation contact form (client-side demo)
- Google Maps embed for office location
- Local SEO meta tags and keywords for Ajmer
- Accessible markup (ARIA labels, semantic HTML)
- Lazy-loaded images for fast page loads
- No build step required — pure HTML/CSS/JS

## Deploy Online

Your site is static HTML — no server needed. Pick **one** option below.

### Recommended: Netlify

1. Go to **[netlify.com](https://www.netlify.com)** → Sign up free
2. **Add new site** → Import your GitHub repo
3. Deploy settings: leave build command empty, publish directory `.`
4. Rename site to e.g. `disha-properties` → `https://disha-properties.netlify.app`
5. Add custom domain (e.g. `dishapropertiesajmer.in`) in Domain management

### GitHub Pages

Push to `main` — the workflow `.github/workflows/deploy-pages.yml` deploys automatically.

### Contact Form (Production)

The contact form shows a success message on submit (demo only). For production:

- **Netlify:** add `data-netlify="true"` to the form in `contact.html`
- **Any host:** use [Formspree](https://formspree.io) — change form `action` to your Formspree endpoint

## Local Preview

```bash
./start.sh
# Open http://localhost:8080
```
