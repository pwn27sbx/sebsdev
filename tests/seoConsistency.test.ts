import { describe, expect, test } from 'bun:test';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { SITE_ORIGIN, SEO_ROUTES } from '../src/config/site';

const ROOT = path.resolve(__dirname, '..');

function readRepoFile(relPath: string): string {
  return readFileSync(path.join(ROOT, relPath), 'utf-8');
}

/** Parses non-wildcard <Route path="..."> values declared in src/App.tsx. */
function parseAppRoutes(): string[] {
  const source = readRepoFile('src/App.tsx');
  const matches = [...source.matchAll(/<Route\s+path="([^"]+)"/g)];
  return matches.map((m) => m[1]).filter((p) => p !== '*');
}

/** Parses <loc> entries from public/sitemap.xml. */
function parseSitemapLocs(): string[] {
  const xml = readRepoFile('public/sitemap.xml');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

/** Recursively lists files under a directory, returning repo-relative paths. */
function listFilesRecursive(dir: string): string[] {
  const abs = path.join(ROOT, dir);
  if (!existsSync(abs)) return [];
  const entries = readdirSync(abs);
  let results: string[] = [];
  for (const entry of entries) {
    const relPath = path.join(dir, entry);
    const absPath = path.join(ROOT, relPath);
    const stat = statSync(absPath);
    if (stat.isDirectory()) {
      if (relPath === 'node_modules' || relPath.endsWith('/node_modules') || relPath === 'dist') continue;
      results = results.concat(listFilesRecursive(relPath));
    } else {
      results.push(relPath);
    }
  }
  return results;
}

describe('SEO consistency', () => {
  test('App.tsx routes match sitemap.xml paths', () => {
    const appRoutes = parseAppRoutes().sort();
    const sitemapPaths = parseSitemapLocs()
      .map((loc) => {
        const withoutOrigin = loc.replace(SITE_ORIGIN, '');
        return withoutOrigin === '' || withoutOrigin === '/' ? '/' : withoutOrigin.replace(/\/$/, '');
      })
      .sort();

    expect(sitemapPaths).toEqual(appRoutes);
  });

  test('App.tsx routes (minus root) match scripts/generate-seo.js routes list', () => {
    const appRoutes = parseAppRoutes()
      .filter((p) => p !== '/')
      .map((p) => p.replace(/^\//, ''))
      .sort();
    const generatorRoutes = SEO_ROUTES.map((r) => r.path).sort();

    expect(generatorRoutes).toEqual(appRoutes);
  });

  test('no leftover GitHub Pages URL remains in tracked source/output files', () => {
    const dirs = ['public', 'scripts', 'src'];
    const offenders: string[] = [];
    const forbidden = ['pwn27sbx.github.io', 'mi-portafolio'];

    const filesToCheck = ['index.html', ...dirs.flatMap((d) => listFilesRecursive(d))];

    for (const relPath of filesToCheck) {
      if (relPath === 'package.json') continue;
      const absPath = path.join(ROOT, relPath);
      if (!existsSync(absPath) || statSync(absPath).isDirectory()) continue;
      const content = readFileSync(absPath, 'utf-8');
      for (const needle of forbidden) {
        if (content.includes(needle)) {
          offenders.push(`${relPath}: contains "${needle}"`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  test('sitemap.xml <loc> entries use the site origin', () => {
    const locs = parseSitemapLocs();
    expect(locs.length).toBeGreaterThan(0);
    for (const loc of locs) {
      expect(loc.startsWith(SITE_ORIGIN)).toBe(true);
    }
  });

  test('robots.txt Sitemap directive uses the site origin', () => {
    const robots = readRepoFile('public/robots.txt');
    const sitemapLine = robots
      .split('\n')
      .find((line) => line.trim().toLowerCase().startsWith('sitemap:'));
    expect(sitemapLine).toBeDefined();
    expect(sitemapLine!.includes(SITE_ORIGIN)).toBe(true);
  });

  test('vercel.json redirects /contacto to /contact and rewrites everything to /index.html', () => {
    const vercelPath = path.join(ROOT, 'vercel.json');
    expect(existsSync(vercelPath)).toBe(true);
    const config = JSON.parse(readFileSync(vercelPath, 'utf-8'));

    const redirect = (config.redirects ?? []).find(
      (r: { source?: string }) => r.source === '/contacto'
    );
    expect(redirect).toBeDefined();
    expect(redirect.destination).toBe('/contact');
    expect(redirect.permanent).toBe(true);

    const rewrite = (config.rewrites ?? []).find(
      (r: { destination?: string }) => r.destination === '/index.html'
    );
    expect(rewrite).toBeDefined();
  });

  test('public/404.html (GitHub Pages SPA hack) has been removed', () => {
    expect(existsSync(path.join(ROOT, 'public/404.html'))).toBe(false);
  });
});
