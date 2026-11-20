import { useEffect, useSyncExternalStore } from 'react';

/**
 * A deliberately small History API router. The site has a handful of flat
 * pages, so a dependency would cost more than it saves.
 */

const listeners = new Set<() => void>();

function subscribe(fn: () => void) {
  listeners.add(fn);
  window.addEventListener('popstate', fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('popstate', fn);
  };
}

const normalise = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

export function usePath() {
  return useSyncExternalStore(
    subscribe,
    () => normalise(window.location.pathname),
    () => '/',
  );
}

export function navigate(to: string) {
  if (to === window.location.pathname) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.history.pushState(null, '', to);
  window.scrollTo(0, 0);
  listeners.forEach((fn) => fn());
}

/** Keeps the tab title in step with the current page. */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
