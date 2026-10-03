import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { langs } from '../src/data/i18n';

const ROOT = path.resolve(__dirname, '..');

function readRepoFile(relPath: string): string {
  return readFileSync(path.join(ROOT, relPath), 'utf-8');
}

/** Extracts the Helmet <title> content (raw JSX expression or text) from a page source. */
function extractTitle(source: string): string | undefined {
  return source.match(/<title>([^<]+)<\/title>/)?.[1];
}

/** Extracts the Helmet meta description content (raw JSX expression or text) from a page source. */
function extractDescription(source: string): string | undefined {
  return source.match(/name="description"\s+content=(\{[^}]+\}|"[^"]*")/)?.[1];
}

/** Extracts the i18n key referenced inside a `{t('key', lang)}` expression, if present. */
function extractTKey(expression: string | undefined): string | undefined {
  return expression?.match(/t\(['"]([^'"]+)['"],\s*lang\)/)?.[1];
}

const pages: Array<{ name: string; cyberpunk: string; minimal: string }> = [
  { name: 'About', cyberpunk: 'src/pages/AboutCyberpunk.tsx', minimal: 'src/pages/AboutMinimal.tsx' },
  { name: 'Archive', cyberpunk: 'src/pages/ArchiveCyberpunk.tsx', minimal: 'src/pages/ArchiveMinimal.tsx' },
  { name: 'Contact', cyberpunk: 'src/pages/ContactCyberpunk.tsx', minimal: 'src/pages/ContactMinimal.tsx' },
];

describe('Page SEO metadata follows the active language (both layouts)', () => {
  for (const { name, cyberpunk, minimal } of pages) {
    describe(`${name} page`, () => {
      for (const [layoutName, file] of [
        ['Cyberpunk', cyberpunk],
        ['Minimal', minimal],
      ] as const) {
        test(`${layoutName} Helmet title uses t(...) with a key present in both es and en dictionaries`, () => {
          const source = readRepoFile(file);
          const rawTitle = extractTitle(source);
          expect(rawTitle).toBeDefined();

          const key = extractTKey(rawTitle);
          expect(key).toBeDefined();

          expect(langs.es).toHaveProperty(key!);
          expect(langs.en).toHaveProperty(key!);
          expect((langs.es as Record<string, string>)[key!]).not.toBe(
            (langs.en as Record<string, string>)[key!],
          );
        });

        test(`${layoutName} Helmet meta description uses t(...) with a key present in both es and en dictionaries`, () => {
          const source = readRepoFile(file);
          const rawDesc = extractDescription(source);
          expect(rawDesc).toBeDefined();

          const key = extractTKey(rawDesc);
          expect(key).toBeDefined();

          expect(langs.es).toHaveProperty(key!);
          expect(langs.en).toHaveProperty(key!);
          expect((langs.es as Record<string, string>)[key!]).not.toBe(
            (langs.en as Record<string, string>)[key!],
          );
        });
      }

      test('Cyberpunk and Minimal use the same i18n keys for title and description', () => {
        const cyberSource = readRepoFile(cyberpunk);
        const minimalSource = readRepoFile(minimal);

        const cyberTitleKey = extractTKey(extractTitle(cyberSource));
        const minimalTitleKey = extractTKey(extractTitle(minimalSource));
        expect(minimalTitleKey).toBe(cyberTitleKey);

        const cyberDescKey = extractTKey(extractDescription(cyberSource));
        const minimalDescKey = extractTKey(extractDescription(minimalSource));
        expect(minimalDescKey).toBe(cyberDescKey);
      });
    });
  }
});
