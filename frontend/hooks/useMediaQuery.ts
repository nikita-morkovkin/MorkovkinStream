import { useCallback, useSyncExternalStore } from 'react';

/**
 * Custom hook to subscribe to media queries.
 * Optimized for React 18+ and Next.js SSR using useSyncExternalStore.
 *
 * @param query The media query to match (e.g., '(max-width: 768px)')
 * @param defaultValue Default value for SSR and initial render (default: false)
 * @returns boolean indicating if the media query matches
 */

export function useMediaQuery(
  query: string,
  defaultValue: boolean = false,
): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMediaList = window.matchMedia(query);
      matchMediaList.addEventListener('change', callback);

      return () => matchMediaList.removeEventListener('change', callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => {
    return defaultValue;
  }, [defaultValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
