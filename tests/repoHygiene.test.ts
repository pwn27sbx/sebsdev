import { describe, expect, test } from 'bun:test';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(__dirname, '..');

function readRepoFile(relPath: string): string {
  return readFileSync(path.join(ROOT, relPath), 'utf-8');
}

/**
 * Runs a git command and returns its result only when git actually ran and
 * succeeded. git may be missing (ENOENT -> error) or the tree may not be a
 * git checkout (non-zero status), so null means "unavailable" and callers must
 * never dereference it blindly.
 */
function runGit(args: string[]) {
  const result = spawnSync('git', args, { cwd: ROOT, encoding: 'utf-8' });
  if (result.error || typeof result.stdout !== 'string' || result.status !== 0) {
    return null;
  }
  return result;
}

// Resolved once so every git-dependent assertion guards on the same signal.
const gitAvailable = runGit(['rev-parse', '--git-dir']) !== null;

describe('repo hygiene', () => {
  test('App.tsx does not block context menu, devtools shortcuts, or image drag', () => {
    const source = readRepoFile('src/App.tsx');

    expect(source).not.toContain('contextmenu');
    expect(source).not.toMatch(/e\.key\s*===\s*['"]F12['"]/);
    expect(source).not.toMatch(/ctrlKey\s*&&\s*e\.shiftKey\s*&&\s*e\.key\s*===\s*['"]I['"]/);
    expect(source).not.toMatch(/ctrlKey\s*&&\s*e\.shiftKey\s*&&\s*e\.key\s*===\s*['"]J['"]/);
    expect(source).not.toMatch(/ctrlKey\s*&&\s*e\.shiftKey\s*&&\s*e\.key\s*===\s*['"]C['"]/);
    expect(source).not.toMatch(/ctrlKey\s*&&\s*e\.key\s*===\s*['"]u['"]/);
    expect(source).not.toContain('dragstart');
  });

  // Enumerating tracked files fundamentally needs git; skip honestly when absent.
  test.skipIf(!gitAvailable)('every public/cyber_mask*.png file is referenced somewhere under src/', () => {
    // Tracked files only, so the result never depends on untracked local files.
    const tracked = runGit(['ls-files', 'public'])?.stdout ?? '';
    const maskFiles = tracked
      .split('\n')
      .map((f) => path.basename(f))
      .filter((f) => /^cyber_mask.*\.png$/.test(f));
    expect(maskFiles).toContain('cyber_mask_transparent.png');

    function listFilesRecursive(dir: string): string[] {
      const abs = path.join(ROOT, dir);
      let results: string[] = [];
      for (const entry of readdirSync(abs, { withFileTypes: true })) {
        const relPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results = results.concat(listFilesRecursive(relPath));
        } else {
          results.push(relPath);
        }
      }
      return results;
    }

    const srcFiles = listFilesRecursive('src');
    const srcContents = srcFiles.map((f) => readRepoFile(f)).join('\n');

    const unreferenced = maskFiles.filter((f) => !srcContents.includes(f));
    expect(unreferenced).toEqual([]);
  });

  test('odd/ directory is gitignored and not tracked by git', () => {
    // Primary check is git-free so it still runs when git is unavailable or the
    // tree is not a checkout; the suite must not depend on the environment.
    expect(readRepoFile('.gitignore')).toMatch(/^odd\/$/m);

    // Secondary checks need git; guard them rather than dereferencing null.
    if (gitAvailable) {
      const lsFiles = runGit(['ls-files', 'odd']);
      expect(lsFiles).not.toBeNull();
      expect(lsFiles!.stdout.trim()).toBe('');

      const checkIgnore = runGit(['check-ignore', '-q', 'odd/tasks/x.md']);
      expect(checkIgnore).not.toBeNull();
      expect(checkIgnore!.status).toBe(0);
    }
  });

  test('README.md is a real document referencing bun dev/build/test commands', () => {
    const readme = readRepoFile('README.md');
    const lines = readme.split('\n');

    expect(lines.length).toBeGreaterThan(20);
    expect(readme).toContain('bun run dev');
    expect(readme).toContain('bun run build');
    expect(readme).toContain('bun test');
  });
});
