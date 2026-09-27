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
- [ ] T1 Consistency test first (RED): routes in `src/App.tsx`, `public/sitemap.xml` and `scripts/generate-seo.js` agree; no `pwn27sbx.github.io`/`mi-portafolio` URL left in index.html, public/, scripts/, src/; sitemap/robots use the site origin. Route: delegated writer.
- [ ] T2 Site origin + `/contact`: shared constant, fix index.html, sitemap, robots, generate-seo (route list + canonical + og:url per route), page canonicals incl. Minimal. Route: delegated writer.
- [ ] T3 Deep links: `vercel.json` rewrites + `/contacto` → `/contact` 301, remove `public/404.html`. Route: delegated writer.
- [ ] T4 Verify: tests, tsc, lint, build, inspect generated `dist/*/index.html` canonicals; commit per task; push to `origin/dev` after all pass (user-authorized).

## Acceptance criteria
- `bun test` green including the new consistency test; tsc and lint clean; build succeeds and `dist/contact/index.html` exists with the correct canonical.
- No reference to the GitHub Pages URL remains.
- After deploy: `/contact` and other deep links return the app; `/contacto` redirects to `/contact`.

## Progress / evidence
(filled per task)
