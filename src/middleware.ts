import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales } from './shared/locales';

const handleI18nRouting = createMiddleware({
  locales: locales,

  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
};
export default async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  return response;
}
