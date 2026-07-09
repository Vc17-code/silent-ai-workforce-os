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

## Deploy Online (Permanent URL for Your Client)

Your site is static HTML — no server needed. Pick **one** option below.

---

### ⭐ Recommended: Netlify (easiest for clients)

**Free permanent URL:** `your-business-name.netlify.app`  
**Custom domain:** `www.apexplumbing.in` (buy domain separately ~₹500–800/year)

#### Steps (about 10 minutes)

1. Go to **[netlify.com](https://www.netlify.com)** → Sign up free (GitHub login works)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repo: `Vc17-code/silent-ai-workforce-os`
4. Deploy settings (auto-detected):
   - Build command: *(leave empty)*
   - Publish directory: `.` (root)
5. Click **Deploy site**
6. Netlify gives you a permanent URL like:  
   `https://random-name-123.netlify.app`
7. Rename it: **Site settings → Domain management → Options → Edit site name**  
   → e.g. `apex-plumbing` → **`https://apex-plumbing.netlify.app`**

#### Add a custom domain (professional client URL)

1. Buy a domain (Namecheap, GoDaddy, Google Domains) — e.g. `apexplumbing.in`
2. In Netlify: **Domain management → Add custom domain** → enter `apexplumbing.in`
3. Netlify shows DNS records — add them at your domain registrar
4. Wait 5–60 minutes for SSL (HTTPS) to activate automatically
5. **Hand your client:** `https://apexplumbing.in` ✅

#### Enable the contact form (receive real leads)

Add `data-netlify="true"` to the `<form>` tag in `contact.html`, redeploy, and submissions appear in **Netlify → Forms**.

---

### Option 2: GitHub Pages (free, good if you already use GitHub)

**Free permanent URL:** `https://vc17-code.github.io/silent-ai-workforce-os/`

#### Steps

1. Push this repo to GitHub (already done)
2. Go to repo → **Settings → Pages**
3. Under **Build and deployment**:
   - Source: **GitHub Actions**
4. The workflow `.github/workflows/deploy-pages.yml` deploys automatically on every push to `main`
5. Wait 2–3 minutes → your site is live at the URL above

#### Custom domain on GitHub Pages

1. Buy a domain
2. Repo → **Settings → Pages → Custom domain** → enter `apexplumbing.in`
3. Add DNS records at your registrar (GitHub shows exact values)
4. Enable **Enforce HTTPS**

---

### Option 3: Vercel (alternative to Netlify)

1. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub
2. **Add New Project** → import `silent-ai-workforce-os`
3. Deploy (no build settings needed)
4. Permanent URL: `https://silent-ai-workforce-os.vercel.app`
5. Custom domain: **Project Settings → Domains**

---

### What to give your client

| Item | Example |
|------|---------|
| **Website URL** | `https://apexplumbing.in` |
| **Admin (if Netlify)** | Netlify login to view form submissions |
| **Updates** | Edit HTML files → push to GitHub → auto-redeploys |

---

### Quick comparison

| Platform | Free URL | Custom Domain | Form Handling | Best For |
|----------|----------|---------------|---------------|----------|
| **Netlify** | `name.netlify.app` | ✅ Free SSL | ✅ Built-in | **Client delivery** |
| **GitHub Pages** | `user.github.io/repo` | ✅ Free SSL | ❌ Needs Formspree | Developers |
| **Vercel** | `name.vercel.app` | ✅ Free SSL | ❌ Needs Formspree | Developers |

**For a paying client → use Netlify + custom domain.**

## Contact Form

The contact form currently shows a success message on submit (demo only). For production:

- **Netlify:** add `data-netlify="true"` to the form in `contact.html`
- **Any host:** use [Formspree](https://formspree.io) — change form `action` to your Formspree endpoint

## Local Preview

```bash
./start.sh
# Open http://localhost:8080
```

