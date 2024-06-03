import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Header } from "~/feature/navigation";
const ReduxProviders = dynamic(() => import("~/store/store-provider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddit App",
  description: "Copy of reddit app for pet project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>
          <header className="px-4 py-2 h-14">
            <Header />
          </header>
          {children}
        </ReduxProviders>
      </body>
    </html>
  );
}
