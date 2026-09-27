import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface UseCanvasVisibilityResult<T extends Element> {
  /** Attach to the element that wraps the R3F <Canvas>. */
  ref: RefObject<T | null>;
  /** False when the element is scrolled off-screen or the document tab is hidden. */
  isVisible: boolean;
}

/**
 * Wires an IntersectionObserver (off-screen / scrolled away) plus the
 * document's `visibilitychange` event (tab hidden) to `onChange`, called
 * with the combined visibility whenever either signal changes. Extracted
 * from the hook so this logic can be unit-tested without a DOM/React
 * renderer. Returns an unsubscribe function.
 */
export function observeVisibility(
  node: Element,
  doc: Document,
  onChange: (visible: boolean) => void,
  ObserverImpl: typeof IntersectionObserver = IntersectionObserver
): () => void {
  let isIntersecting = true;

  const updateVisibility = () => {
    onChange(isIntersecting && doc.visibilityState !== 'hidden');
  };

  const observer = new ObserverImpl(
    ([entry]) => {
      isIntersecting = entry?.isIntersecting ?? true;
      updateVisibility();
    },
    { threshold: 0 }
  );
  observer.observe(node);

  doc.addEventListener('visibilitychange', updateVisibility);

  return () => {
    observer.disconnect();
    doc.removeEventListener('visibilitychange', updateVisibility);
  };
}

/**
 * Tracks whether an element is actually visible to the user, combining an
 * IntersectionObserver (off-screen / scrolled away) with the document's
 * `visibilitychange` event (tab hidden). Meant to drive an R3F `<Canvas
 * frameloop>` so it stops rendering when nobody can see it.
 */
export function useCanvasVisibility<T extends Element>(): UseCanvasVisibilityResult<T> {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined' || typeof document === 'undefined') {
      return;
    }

    return observeVisibility(node, document, setIsVisible);
  }, []);

  return { ref, isVisible };
}
