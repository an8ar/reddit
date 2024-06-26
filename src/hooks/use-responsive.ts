import { useMediaQuery } from 'react-responsive';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Query = 'up' | 'down' | 'between';
type Key = keyof typeof breakpoints | number;

export function useResponsive(query: Query, key: Key, endKey?: Key): boolean {
  let mediaQueryObject = {};

  if (query === 'up') {
    mediaQueryObject = { minWidth: typeof key === 'number' ? key : breakpoints[key] };
  } else if (query === 'down') {
    mediaQueryObject = { maxWidth: typeof key === 'number' ? key : breakpoints[key] };
  } else if (query === 'between' && endKey !== undefined) {
    const startWidth = typeof key === 'number' ? key : breakpoints[key];
    const endWidth = typeof endKey === 'number' ? endKey : breakpoints[endKey];
    mediaQueryObject = { minWidth: startWidth, maxWidth: endWidth };
  }

  return useMediaQuery(mediaQueryObject);
}
