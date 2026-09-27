/**
 * Single source of truth for the deployed site origin and the per-route SEO
 * metadata used both by the client (page canonicals) and by the build-time
 * `scripts/generate-seo.js` script that writes the static SEO HTML variants.
 *
 * Keep this the only place the deployed origin is spelled out.
 */
export const SITE_ORIGIN = 'https://sebsportfolio.vercel.app';

export interface SeoRoute {
  /** Route path without leading slash, e.g. "about". */
  path: string;
  title: string;
  description: string;
}

/**
 * Non-root routes that get generated static SEO HTML (see
 * scripts/generate-seo.js). The root route ("/") uses dist/index.html as-is.
 * These paths must match the non-wildcard routes declared in src/App.tsx
 * (minus "/").
 */
export const SEO_ROUTES: SeoRoute[] = [
  {
    path: 'proyectos',
    title: 'Archivo de Proyectos | Sebastian',
    description:
      'Explora mi archivo de proyectos interactivos desde 2021 a 2026. Especializado en React y UI/UX.',
  },
  {
    path: 'about',
    title: 'Sobre Mí | Sebastian',
    description:
      'Desarrollador frontend de Arequipa, Perú, apasionado por crear experiencias digitales.',
  },
  {
    path: 'contact',
    title: 'Contacto | Sebastian',
    description: '¿Tienes una propuesta o proyecto? Contáctame para trabajar juntos.',
  },
];

/** Builds an absolute canonical URL for a route path ("" or "about", etc.). */
export function canonicalUrl(routePath: string): string {
  if (!routePath || routePath === '/') {
    return `${SITE_ORIGIN}/`;
  }
  const normalized = routePath.startsWith('/') ? routePath.slice(1) : routePath;
  return `${SITE_ORIGIN}/${normalized}`;
}
