import { describe, expect, test } from 'bun:test';
import { observeVisibility } from '../src/hooks/useCanvasVisibility';

type IntersectionCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

/** Minimal fake IntersectionObserver so observeVisibility can be tested without a DOM. */
function createFakeObserverClass() {
  let lastCallback: IntersectionCallback | null = null;
  let observeCalls = 0;
  let disconnectCalls = 0;

  class FakeIntersectionObserver {
    constructor(callback: IntersectionCallback) {
      lastCallback = callback;
    }
    observe() {
      observeCalls++;
    }
    disconnect() {
      disconnectCalls++;
    }
  }

  return {
    FakeIntersectionObserver: FakeIntersectionObserver as unknown as typeof IntersectionObserver,
    fireIntersection(isIntersecting: boolean) {
      lastCallback?.([{ isIntersecting }]);
    },
    get observeCalls() {
      return observeCalls;
    },
    get disconnectCalls() {
      return disconnectCalls;
    },
  };
}

/** Minimal fake Document exposing only what observeVisibility needs. */
function createFakeDocument(initialVisibilityState: DocumentVisibilityState) {
  let visibilityState = initialVisibilityState;
  let listener: (() => void) | null = null;
  let removedCount = 0;

  const doc = {
    get visibilityState() {
      return visibilityState;
    },
    addEventListener(type: string, cb: () => void) {
      if (type === 'visibilitychange') listener = cb;
    },
    removeEventListener(type: string, cb: () => void) {
      if (type === 'visibilitychange' && listener === cb) {
        listener = null;
        removedCount++;
      }
    },
  } as unknown as Document;

  return {
    doc,
    setVisibilityState(next: DocumentVisibilityState) {
      visibilityState = next;
      listener?.();
    },
    get removedCount() {
      return removedCount;
    },
  };
}

describe('observeVisibility', () => {
  test('reports visible when intersecting and the tab is visible', () => {
    const observerCtl = createFakeObserverClass();
    const docCtl = createFakeDocument('visible');
    const seen: boolean[] = [];

    observeVisibility({} as Element, docCtl.doc, (v) => seen.push(v), observerCtl.FakeIntersectionObserver);
    observerCtl.fireIntersection(true);

    expect(seen).toEqual([true]);
    expect(observerCtl.observeCalls).toBe(1);
  });

  test('reports not visible when scrolled off-screen', () => {
    const observerCtl = createFakeObserverClass();
    const docCtl = createFakeDocument('visible');
    const seen: boolean[] = [];

    observeVisibility({} as Element, docCtl.doc, (v) => seen.push(v), observerCtl.FakeIntersectionObserver);
    observerCtl.fireIntersection(false);

    expect(seen).toEqual([false]);
  });

  test('reports not visible when the tab is hidden even while intersecting', () => {
    const observerCtl = createFakeObserverClass();
    const docCtl = createFakeDocument('visible');
    const seen: boolean[] = [];

    observeVisibility({} as Element, docCtl.doc, (v) => seen.push(v), observerCtl.FakeIntersectionObserver);
    observerCtl.fireIntersection(true);
    docCtl.setVisibilityState('hidden');

    expect(seen).toEqual([true, false]);
  });

  test('the returned unsubscribe function disconnects the observer and removes the listener', () => {
    const observerCtl = createFakeObserverClass();
    const docCtl = createFakeDocument('visible');

    const unsubscribe = observeVisibility({} as Element, docCtl.doc, () => {}, observerCtl.FakeIntersectionObserver);
    unsubscribe();

    expect(observerCtl.disconnectCalls).toBe(1);
    expect(docCtl.removedCount).toBe(1);
  });
});
