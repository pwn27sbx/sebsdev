import { describe, expect, test } from 'bun:test';
import { subscribeToReducedMotion } from '../src/hooks/usePrefersReducedMotion';

type ChangeListener = (event: MediaQueryListEvent) => void;

/** Minimal fake matchMedia so subscribeToReducedMotion's logic can be tested without a DOM. */
function createFakeWindow(initialMatches: boolean) {
  let matches = initialMatches;
  let listener: ChangeListener | null = null;
  let removedCount = 0;

  const mql = {
    get matches() {
      return matches;
    },
    addEventListener(type: string, cb: ChangeListener) {
      if (type === 'change') listener = cb;
    },
    removeEventListener(type: string, cb: ChangeListener) {
      if (type === 'change' && listener === cb) {
        listener = null;
        removedCount++;
      }
    },
  } as unknown as MediaQueryList;

  const win = {
    matchMedia: () => mql,
  } as unknown as Window;

  return {
    win,
    fireChange(next: boolean) {
      matches = next;
      listener?.({ matches: next } as MediaQueryListEvent);
    },
    get removedCount() {
      return removedCount;
    },
    get hasListener() {
      return listener !== null;
    },
  };
}

describe('subscribeToReducedMotion', () => {
  test('calls onChange immediately with the current value', () => {
    const { win } = createFakeWindow(true);
    const seen: boolean[] = [];

    subscribeToReducedMotion(win, (matches) => seen.push(matches));

    expect(seen).toEqual([true]);
  });

  test('calls onChange again when the media query changes', () => {
    const fake = createFakeWindow(false);
    const seen: boolean[] = [];

    subscribeToReducedMotion(fake.win, (matches) => seen.push(matches));
    fake.fireChange(true);
    fake.fireChange(false);

    expect(seen).toEqual([false, true, false]);
  });

  test('the returned unsubscribe function removes the listener', () => {
    const fake = createFakeWindow(false);
    const unsubscribe = subscribeToReducedMotion(fake.win, () => {});

    expect(fake.hasListener).toBe(true);
    unsubscribe();
    expect(fake.hasListener).toBe(false);
    expect(fake.removedCount).toBe(1);
  });

  test('defaults to false and never throws when window has no matchMedia (SSR)', () => {
    const seen: boolean[] = [];
    const ssrWindow = {} as Window;

    expect(() => subscribeToReducedMotion(ssrWindow, (m) => seen.push(m))).not.toThrow();
    expect(seen).toEqual([false]);
  });
});
