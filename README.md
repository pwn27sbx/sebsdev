# Sebastian's Portfolio

Personal portfolio of Sebastian, a frontend developer, live at
[sebsportfolio.vercel.app](https://sebsportfolio.vercel.app). It is a single-page
React application with client-side routing, an interactive 3D hero built with
React Three Fiber, animated page transitions, and a switchable visual identity
(layout mode, color theme, and language) that the visitor controls at runtime.

## Features

- **Two layout modes**: a "Cyberpunk" mode (custom cursor, side marquee, animated
  grid background, and the 3D scene) and a lighter "Minimal" mode, toggled at
  runtime via `PortfolioContext`.
- **Dark/light mode and multiple color themes** (e.g. holonoir, metrovapor,
  biohazard, dataheist, tealnight, laserlime, circuitgarden), persisted to
  `localStorage`.
- **Spanish/English i18n** (`src/data/i18n.ts`), with language detection from the
  browser and a manual switch.
- **3D interactive hero** built with `three`, `@react-three/fiber`, and
  `@react-three/drei` (`src/components/canvas/Scene`, `src/components/hero`).
- **Smooth scrolling and animations** via `lenis`, `framer-motion`, and `gsap`.
- **PWA support** through `vite-plugin-pwa`.
- **Per-route SEO**: canonical URLs, a generated sitemap, and static SEO HTML
  variants produced at build time (`scripts/generate-seo.js`), driven by a single
  source of truth in `src/config/site.ts`.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool, `@vitejs/plugin-react`)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- [react-router-dom](https://reactrouter.com/) for client-side routing
- [react-helmet-async](https://github.com/staylor/react-helmet-async) for
  per-page document head management
- [three.js](https://threejs.org/) / [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
  / [@react-three/drei](https://github.com/pmndrs/drei) for the 3D hero
- [framer-motion](https://www.framer.com/motion/) and [gsap](https://gsap.com/)
  for animation
- [lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for the PWA manifest and
  service worker
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting
- [bun](https://bun.sh/) as package manager, script runner, and test runner

## Requirements

- [Bun](https://bun.sh/) (used for installs, scripts, dev server tooling, and
  tests).

## Getting started

```bash
bun install
bun run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `bun install` | Install dependencies. |
| `bun run dev` | Start the Vite dev server. |
| `bun run build` | Type-check and bundle for production with Vite, then run `scripts/generate-seo.js` to emit static per-route SEO HTML. |
| `bun run preview` | Preview the production build locally. |
| `bun test` | Run the test suite with Bun's built-in test runner. |
| `bun run lint` | Lint the codebase with `oxlint`. |

## Project structure

```
src/
  App.tsx           # Routes, layout switching, and top-level providers
  components/       # UI components (layout, hero, canvas/3D, common, atoms/etc.)
  pages/            # Route-level pages (Home, Archive, About, Contact, NotFound)
  context/          # PortfolioContext: theme, layout mode, language, immersion state
  data/             # i18n strings and project data
  config/           # site.ts: canonical origin and per-route SEO metadata
  constants/        # Shared constants
  hooks/            # Custom hooks
  styles/           # Global styles
public/             # Static assets served as-is (images, manifest, sitemap, robots.txt)
scripts/            # Build-time and optional asset-processing scripts
tests/              # Bun test specs (SEO/routing consistency, repo hygiene)
```

## Deployment

The site is deployed on [Vercel](https://vercel.com/), built from the `main`
branch. `vercel.json` configures SPA rewrites (all paths serve `index.html`) and
a permanent redirect from `/contacto` to `/contact`. The canonical site origin
used for SEO metadata, canonical URLs, and the sitemap is defined once in
`src/config/site.ts` (`SITE_ORIGIN`).

## Asset scripts

`scripts/process_mask.py`, `scripts/extract_glow.py`, and `scripts/create_depth.py`
are optional, standalone image-processing helpers (Pillow-based CLI tools that
take input/output paths as arguments) used to prepare hero mask artwork. They
are not invoked by `bun run build` or any other script and are kept for manual,
occasional use when regenerating that artwork.
