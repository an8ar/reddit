import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware({
  locales: ['en', 'ru'],

  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
};
export default async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  return response;
}
