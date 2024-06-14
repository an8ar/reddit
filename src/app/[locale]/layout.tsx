import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { Header, SideBar } from '~/feature/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
const ReduxProviders = dynamic(() => import('~/store/store-provider'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Reddit App',
  description: 'Copy of reddit app for pet project',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ReduxProviders>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <div className="flex gap-3 w-8/12">
              <SideBar />

              {children}
            </div>
          </NextIntlClientProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}