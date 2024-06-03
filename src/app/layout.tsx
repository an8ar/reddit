import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Header, SideBar } from "~/feature/navigation";
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
          <Header />
          <div className="flex gap-3 w-8/12">
            <SideBar />

            {children}
          </div>
        </ReduxProviders>
      </body>
    </html>
  );
}
