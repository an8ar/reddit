import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Skeleton } from '~/components/ui/skeleton';

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <header className="w-full ml-16">
      <div className="my-3 flex gap-4">
        <Avatar className="size-28">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 justify-end mb-4">
          <h1 className="font-bold text-2xl">an8ar</h1>
          <h3 className="text-sm text-gray-600 font-medium">u/an8ar</h3>
        </div>
      </div>

      <nav className="flex justify-between text-sm font-medium">
        <Link href={`/${locale}/profile`} className="rounded-full hover:bg-slate-300 px-3 py-2">
          Overview
        </Link>
        <Link
          href={`/${locale}/profile/posts`}
          className="rounded-full hover:bg-slate-300 px-3 py-2"
        >
          Posts
        </Link>
        <Link
          href={`/${locale}/profile/comments`}
          className="rounded-full hover:bg-slate-300 px-3 py-2"
        >
          Comments
        </Link>
        <Link
          href={`/${locale}/profile/saved`}
          className="rounded-full hover:bg-slate-300 px-3 py-2"
        >
          Saved
        </Link>
        <Link
          href={`/${locale}/profile/hidden`}
          className="rounded-full hover:bg-slate-300 px-3 py-2"
        >
          Hidden
        </Link>
        <Link
          href={`/${locale}/profile/upvoted`}
          className="rounded-full hover:bg-slate-300 px-3 py-2"
        >
          Upvoted
        </Link>
        <Link
          href={`/${locale}/profile/downvoted`}
          className="rounded-full hover:bg-slate-300 px-3 py-2"
        >
          Downvoted
        </Link>
      </nav>
      {children}
    </header>
  );
}
