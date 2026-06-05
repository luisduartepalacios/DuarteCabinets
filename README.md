# Duarte Cabinets & Design — Website

A fast, image-led portfolio site for **Duarte Cabinets & Design** (designer Itzel Duarte) — a
binational interior design and custom cabinetry studio serving Mexico and the United States.

Built with **Astro** (static), styled with the studio's brand system, and ready to deploy to
**Cloudflare Pages**.

---

## Stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | [Astro](https://astro.build) (static output)      |
| Hosting        | Cloudflare Pages                                  |
| Images         | Astro `<Image>` (optimized WebP) — Cloudinary-ready |
| Contact form   | [Formspree](https://formspree.io) (free tier)     |
| Fonts          | Google Fonts — Cormorant Garamond + Jost          |

## Pages

- **Home** (`/`) — hero, intro statement, featured projects, services, founder, testimonial, CTA
- **Portfolio** (`/projects`) — filterable grid (All / Residential / Commercial)
- **Project detail** (`/projects/[slug]`) — cover, overview, gallery + lightbox, prev/next
- **About** (`/about`) — story, mission & vision, values
- **Services** (`/services`) — Full-Service Design, E-Design, Consultation, process
- **Contact** (`/contact`) — inquiry form (name, email, service, message)
- **404**

---

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to ./dist
npm run preview    # serve the production build locally
```

Requires Node 18.20+, 20.3+, or 22+.

---

## Content: editing projects & copy

All content lives in plain data files — no CMS needed.

- **Projects** — `src/data/projects.ts`. Each project has a `slug`, `title`, `type`
  (`Residential` | `Commercial`), `category`, copy, and a `featured` flag (shown on the home page).
- **Site copy / services / about** — `src/data/site.ts`.

### Adding a new project

1. Drop optimized images in `src/assets/projects/<slug>/` named `<slug>-01.jpg`, `<slug>-02.jpg`, …
   (the **first** image is the cover/hero). Aim for ~2000px wide JPGs; Astro generates responsive
   WebP automatically at build.
2. Add a matching entry to the `meta` array in `src/data/projects.ts`.

---

## Contact form (Formspree)

The form posts to Formspree and needs no backend.

1. Create a free form at **https://formspree.io** and copy its form ID (e.g. `mwkdabcd`).
2. In `src/data/site.ts`, set `formspreeId` to that ID (replace `XXXXXXXX`).
3. Rebuild/redeploy. Submissions arrive by email; the page shows an inline success message.

A honeypot field (`_gotcha`) is included for spam protection.

---

## Images & Cloudinary (optional)

Out of the box, images are **self-hosted and optimized by Astro** (responsive WebP, lazy-loaded) —
the site is fully functional with no third-party image service.

To move delivery to **Cloudinary** later:

1. Upload the `src/assets/projects/**` images to a Cloudinary folder.
2. Create a free account and note your **cloud name**.
3. Reference them via the already-allowlisted domain (`res.cloudinary.com` is set in
   `astro.config.mjs`) using Astro's `<Image src="https://res.cloudinary.com/<cloud>/...">`,
   or add the `@astrojs/cloudinary` / `astro-cloudinary` integration.

The current local pipeline already produces small, fast images, so this is an optimization, not a
requirement.

---

## Deploy to Cloudflare Pages

### Option A — Git (recommended)

1. Push this repo to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Every push to the production branch redeploys automatically.

### Option B — Direct upload (Wrangler)

```bash
npm run build
npx wrangler pages deploy dist --project-name=duarte-cabinets
```

### After deploy

- Point your domain in **Pages → Custom domains**.
- Update `site` in `astro.config.mjs` and the `Sitemap:` line in `public/robots.txt` to the final
  domain (used for canonical URLs, sitemap, and Open Graph).

Caching and security headers are pre-configured in `public/_headers`.

---

## Brand reference

- **Palette:** forest `#1E2D29`, rust `#DC5026`, slate `#455764`, olive `#9B9631`, sand `#CFBD9E`
- **Type:** Cormorant Garamond (display) · Jost (sans)
- **Tagline:** *Espacios inteligentes hechos a tu medida.* — “Smart spaces, made to measure.”

Design tokens are defined once in `src/styles/global.css` (`:root`).
