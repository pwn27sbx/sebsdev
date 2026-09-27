import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..');

function readRepoFile(relPath: string): string {
  return readFileSync(path.join(ROOT, relPath), 'utf-8');
}

describe('Minimal layout shares Cyberpunk content', () => {
  test('About Minimal and About Cyberpunk import the same shared tech list', () => {
    const cyber = readRepoFile('src/pages/AboutCyberpunk.tsx');
    const minimal = readRepoFile('src/pages/AboutMinimal.tsx');
    const profile = readRepoFile('src/data/profile.ts');

    expect(cyber).toMatch(/from ['"]\.\.\/data\/profile['"]/);
    expect(minimal).toMatch(/from ['"]\.\.\/data\/profile['"]/);
    // Both pages must not keep their own hard-coded copy of the list.
    expect(cyber).not.toMatch(/const techs = \[/);
    expect(minimal).not.toMatch(/const techs = \[/);
    // Sanity: the shared list actually has more than the old 4-item Minimal list.
    const techMatches = [...profile.matchAll(/'[^']+'/g)];
    expect(techMatches.length).toBeGreaterThanOrEqual(12);
  });

  test('About Minimal does not hard-code English copy that has an i18n key', () => {
    const minimal = readRepoFile('src/pages/AboutMinimal.tsx');

    expect(minimal).not.toContain("Hello, I'm Sebastian");
    expect(minimal).not.toContain('Tech Stack');
    expect(minimal).not.toContain('React & TypeScript');
    expect(minimal).not.toContain('About Me');
    // Must use the shared i18n helper for the translated copy.
    expect(minimal).toMatch(/t\('aboutTitle', lang\)/);
    expect(minimal).toMatch(/t\('aboutDesc1', lang\)/);
    expect(minimal).toMatch(/t\('aboutDesc2', lang\)/);
    expect(minimal).toMatch(/t\('aboutTechs', lang\)/);
  });

  test('About Minimal uses the same Helmet title/description as About Cyberpunk', () => {
    const cyber = readRepoFile('src/pages/AboutCyberpunk.tsx');
    const minimal = readRepoFile('src/pages/AboutMinimal.tsx');

    const cyberTitle = cyber.match(/<title>([^<]+)<\/title>/)?.[1];
    const cyberDesc = cyber.match(/name="description" content="([^"]+)"/)?.[1];
    expect(cyberTitle).toBeDefined();
    expect(cyberDesc).toBeDefined();

    expect(minimal).toContain(`<title>${cyberTitle}</title>`);
    expect(minimal).toContain(`name="description" content="${cyberDesc}"`);
  });

  test('Archive Minimal does not hard-code "All Works" and shares the Cyberpunk Helmet copy', () => {
    const cyber = readRepoFile('src/pages/ArchiveCyberpunk.tsx');
    const minimal = readRepoFile('src/pages/ArchiveMinimal.tsx');

    expect(minimal).not.toContain('All Works');
    expect(minimal).toMatch(/t\('projects', lang\)/);

    const cyberTitle = cyber.match(/<title>([^<]+)<\/title>/)?.[1];
    const cyberDesc = cyber.match(/name="description" content="([^"]+)"/)?.[1];
    expect(minimal).toContain(`<title>${cyberTitle}</title>`);
    expect(minimal).toContain(`name="description" content="${cyberDesc}"`);
  });

  test('Contact Minimal does not hard-code "Get in Touch" and shares the Cyberpunk Helmet copy', () => {
    const cyber = readRepoFile('src/pages/ContactCyberpunk.tsx');
    const minimal = readRepoFile('src/pages/ContactMinimal.tsx');

    expect(minimal).not.toContain('Get in Touch');
    expect(minimal).toMatch(/t\('contactTitle', lang\)/);

    const cyberTitle = cyber.match(/<title>([^<]+)<\/title>/)?.[1];
    const cyberDesc = cyber.match(/name="description" content="([^"]+)"/)?.[1];
    expect(minimal).toContain(`<title>${cyberTitle}</title>`);
    expect(minimal).toContain(`name="description" content="${cyberDesc}"`);
  });

  test('NotFound Minimal reuses the notFoundTitle/goHome i18n keys instead of hard-coded English', () => {
    const minimal = readRepoFile('src/pages/NotFoundMinimal.tsx');

    expect(minimal).not.toContain('Page not found');
    expect(minimal).not.toContain('Return Home');
    expect(minimal).toMatch(/t\('notFoundTitle', lang\)/);
    expect(minimal).toMatch(/t\('goHome', lang\)/);
  });

  test('Home Minimal uses the exact same Helmet title/description as Home Cyberpunk', () => {
    const minimal = readRepoFile('src/pages/HomeMinimal.tsx');

    expect(minimal).not.toContain("- Minimal");
    expect(minimal).toMatch(/<title>\{t\('seoTitle', lang\)\}<\/title>/);
    expect(minimal).toMatch(/name="description" content=\{t\('seoDesc', lang\)\}/);
  });
});
