# Apex Plumbing — Local Business Website

A clean, fast, mobile-responsive static website for **Apex Plumbing**, an emergency plumbing & drain cleaning business serving **Sanpada, Navi Mumbai, Maharashtra**.

## Pages

| Page | File |
|------|------|
| Homepage | `index.html` |
| Emergency Repairs | `services/emergency-repairs.html` |
| Drain Cleaning | `services/drain-cleaning.html` |
| Water Heater Installation | `services/water-heater.html` |
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

## Customize for Your Business

Replace placeholder details across all HTML files:

| Field | Current Value |
|-------|---------------|
| Business Name | Apex Plumbing |
| Phone | +91 98765 43210 |
| Email | info@apexplumbing.in |
| Address | Shop 12, Palm Beach Road, Sanpada, Navi Mumbai, MH 400705 |
| Service Area | Sanpada, Vashi, Nerul, Belapur, Kharghar, Panvel |
| Colors | Navy Blue (`#0a2540`) + Orange (`#f97316`) — edit `css/styles.css` `:root` |

## Features

- Mobile-responsive layout with hamburger navigation
- Click-to-call phone CTAs throughout
- Lead-generation contact form (client-side demo)
- Google Maps embed for service area
- Local SEO meta tags and keywords
- Accessible markup (ARIA labels, semantic HTML)
- Lazy-loaded images for fast page loads
- No build step required — pure HTML/CSS/JS

## Contact Form

The contact form currently shows a success message on submit (demo only). To receive real leads, connect it to a backend service such as [Formspree](https://formspree.io), [Netlify Forms](https://docs.netlify.com/forms/setup/), or your own API endpoint.

## Deploy

Upload all files to any static host:

- **Netlify** — drag & drop the folder
- **GitHub Pages** — push to a `gh-pages` branch
- **Vercel** — `vercel deploy`
