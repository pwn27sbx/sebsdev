import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Legacy Safari (<14) MediaQueryList API, kept only for the fallback branch below. */
interface LegacyMediaQueryList {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
}

/**
 * Subscribes to `(prefers-reduced-motion: reduce)` changes on the given window,
 * calling `onChange` immediately with the current value and again on every
 * change. Returns an unsubscribe function. Extracted from the hook so the
 * subscription logic can be unit-tested without a DOM/React renderer.
 */
export function subscribeToReducedMotion(win: Window, onChange: (matches: boolean) => void): () => void {
  if (typeof win === 'undefined' || typeof win.matchMedia !== 'function') {
    onChange(false);
    return () => {};
  }

  const mql = win.matchMedia(REDUCED_MOTION_QUERY);
  const handleChange = (event: MediaQueryListEvent) => onChange(event.matches);

  onChange(mql.matches);

  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }

  const legacyMql = mql as MediaQueryList & LegacyMediaQueryList;
  legacyMql.addListener?.(handleChange);
  return () => legacyMql.removeListener?.(handleChange);
}

/**
 * SSR-safe hook that tracks the user's `prefers-reduced-motion` OS setting,
 * reactively, so callers can skip decorative loops (scramble/decrypt/type
 * effects, marquees, auto-rotating 3D cameras) for people who asked for less
 * motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    return subscribeToReducedMotion(window, setPrefersReducedMotion);
  }, []);

  return prefersReducedMotion;
}
