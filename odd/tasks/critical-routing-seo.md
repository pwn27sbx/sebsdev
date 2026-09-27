# Critical routing and SEO fixes

Engram mirror: topic `odd/critical-routing-seo/tasks`, project `pwnsxb`. Audit source: Engram "sebsdev audit findings" (topic `audit/sebsdev`).

## Objective
Make the deployed site (Vercel, `https://sebsportfolio.vercel.app`) consistent: one canonical origin, route paths that match the app, and deep links that load instead of 404.

## Problem (verified 2026-09-27)
- Live: `/`, `/about`, `/contacto` → 200; `/contact` (the app's real route) → 404 on direct load/refresh.
- Canonical, `og:url`, `og:image`, JSON-LD, sitemap, robots and `generate-seo.js` point to `https://pwn27sbx.github.io/mi-portafolio`, which does not exist (GitHub Pages is not configured; repo homepage is the Vercel URL).
- `public/404.html` is a GitHub Pages SPA hack that redirects to `/mi-portafolio/` and stores `redirectPath`, which nothing reads.
- Minimal page variants have no canonical tag.

## Decisions
- App routes are the source of truth: `/`, `/proyectos`, `/about`, `/contact`.
- `/contacto` gets a permanent redirect to `/contact` (keeps old links/indexed URL working).
- Single site origin constant `https://sebsportfolio.vercel.app`.
- Deep links handled by Vercel rewrites to `/index.html` (filesystem wins first, so the SEO HTML generated per route is still served); `public/404.html` removed.

## Scope
`vercel.json` (new), `public/404.html` (delete), `index.html`, `public/sitemap.xml`, `public/robots.txt`, `scripts/generate-seo.js`, a shared site config module in `src`, Cyberpunk + Minimal page canonicals, a consistency test. No visual or feature changes.

## TDD
- Mode: strict, enabled (source `~/.claude/CLAUDE.md`). Runner: `bun test`.
- Also: `npx tsc --noEmit -p tsconfig.json`, `bun run lint`, `bun run build` (then inspect `dist/`).

## Tasks
- [x] T1 Consistency test first (RED): routes in `src/App.tsx`, `public/sitemap.xml` and `scripts/generate-seo.js` agree; no `pwn27sbx.github.io`/`mi-portafolio` URL left in index.html, public/, scripts/, src/; sitemap/robots use the site origin. Route: delegated writer.
- [x] T2 Site origin + `/contact`: shared constant, fix index.html, sitemap, robots, generate-seo (route list + canonical + og:url per route), page canonicals incl. Minimal. Route: delegated writer.
- [x] T3 Deep links: `vercel.json` rewrites + `/contacto` → `/contact` 301, remove `public/404.html`. Route: delegated writer.
- [x] T4 Verify: tests, tsc, lint, build, inspect generated `dist/*/index.html` canonicals; commit per task. Push not done (out of authorized scope for this run; requires explicit user go-ahead).

## Acceptance criteria
- `bun test` green including the new consistency test; tsc and lint clean; build succeeds and `dist/contact/index.html` exists with the correct canonical.
- No reference to the GitHub Pages URL remains.
- After deploy: `/contact` and other deep links return the app; `/contacto` redirects to `/contact`.

## Progress / evidence

### T1 — commit `9b10fc3eb7a23f2d85e10cfa8c302a88936aa90d` "test(seo): add failing routing/SEO consistency spec"
Added `tests/seoConsistency.test.ts` and `src/config/site.ts` (shared `SITE_ORIGIN` + `SEO_ROUTES`, importable from bun scripts, bun tests and Vite/React code).
- `bun test tests/seoConsistency.test.ts` → RED: 1 pass, 6 fail (App.tsx-vs-sitemap mismatch, leftover GitHub Pages URLs in sitemap/generate-seo.js/4 Cyberpunk pages, sitemap/robots origin, missing `vercel.json`, `public/404.html` still present). Only "App.tsx routes minus root match generate-seo.js routes" passed (both already listed `contact`).

### T2 — commit `97eae4bb1cd52da926383f336b7244fd68a4dd15` "fix(seo): use sebsportfolio.vercel.app as single canonical origin"
Updated `index.html` (canonical, `og:url`, `og:image`, JSON-LD `url`), `public/sitemap.xml` (`/`, `/proyectos`, `/about`, `/contact`), `public/robots.txt` (`Sitemap:` line), `scripts/generate-seo.js` (now imports `SEO_ROUTES`/`canonicalUrl` from `src/config/site.ts`, route `contacto` renamed to `contact`, added per-route `og:url` replacement), and all 8 page variants (Home/About/Archive/Contact × Cyberpunk/Minimal) via `<link rel="canonical" href={`${SITE_ORIGIN}/...`} />` in their existing `<Helmet>` blocks — Minimal variants previously had none.
- `npx tsc --noEmit -p tsconfig.json` → clean, no errors.
- `bun test tests/seoConsistency.test.ts` → 4 pass, 3 fail (remaining failures all T3-scoped: leftover `/mi-portafolio/` string inside `public/404.html`, missing `vercel.json`, `public/404.html` still present).

### T3 — commit `a3cc4e674d6cbf17cdddd50363cdb8ca10d4d7ab` "feat(routing): add Vercel SPA rewrites and /contacto redirect, drop GitHub Pages 404 hack"
Added `vercel.json` (`/contacto` → `/contact` permanent redirect; catch-all rewrite `/(.*)` → `/index.html`, which only fires after the filesystem match, so `dist/about/index.html` etc. still win). Deleted `public/404.html`. Checked `vite.config.js`'s `VitePWA` workbox config: `navigateFallback: 'index.html'` already, no `404.html` reference — no change needed there.

### T4 — full verification (after T3)
- `bun test` → **GREEN**: 21 pass, 0 fail (2 files, incl. pre-existing `voxelFraming.test.ts`).
- `npx tsc --noEmit -p tsconfig.json` → clean, exit 0.
- `bun run lint` (oxlint) → 5 pre-existing warnings unrelated to this change (unused vars/imports in `HeroMinimal.tsx`, `ScrollSpyNav.tsx`, `HeaderMinimal.tsx`, `PortfolioContext.tsx`), 0 errors.
- `bun run build` → succeeded; `ls dist/contact dist/about dist/proyectos` → each has `index.html`.
  - `grep -o '<link rel="canonical"[^>]*>' dist/index.html dist/*/index.html`:
    - `dist/index.html`: `https://sebsportfolio.vercel.app/`
    - `dist/about/index.html`: `https://sebsportfolio.vercel.app/about`
    - `dist/contact/index.html`: `https://sebsportfolio.vercel.app/contact`
    - `dist/proyectos/index.html`: `https://sebsportfolio.vercel.app/proyectos`
  - `grep -o 'og:url" content="[^"]*"' dist/*/index.html`: about/contact/proyectos each show the matching `sebsportfolio.vercel.app` URL.
- `grep -rn "pwn27sbx.github.io\|mi-portafolio" index.html public scripts src` → no matches (exit 1).
- `git status --short` → clean after each commit (dist/ is gitignored).

### Not done / decisions deferred
- No push to `origin/dev` — repository/user-authorization scope for this run was local implementation only; push remains a separate user-authorized step per the delivery contract.
- `package.json`'s `"name": "mi-portafolio"` intentionally left unchanged (explicitly out of scope; internal npm package name, not a public URL).
- Live-deploy re-check (`/contact` returning 200, `/contacto` redirecting) not performed here — requires a Vercel deploy of this branch, which is outside local verification.
