'use client';
import React from 'react';
import { Post as IPost } from '~/feature/posts/types';
import Image from 'next/image';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useLocale } from 'next-intl';

interface Props extends IPost {}

export function InputPost({ title, imageUrls, text, linkUrl, id }: Props) {
  const router = useRouter();

  const locale = useLocale();

  const handleClick = () => {
    router.push(`/${locale}/post/${id}`);
  };

  return (
    <div
      className="flex-1 flex hover:bg-slate-100 px-4 py-2 hover:cursor-pointer justify-between "
      onClick={handleClick}
    >
      <div>
        <div className="text-sm font-semibold">{title}</div>
        {!!text && <p className="text-xs text-gray-600">{text}</p>}

        <div className="font-semibold text-xs rounded-2xl bg-slate-200 px-1 inline-block">
          an8ar
        </div>

        {linkUrl && (
          <a href={linkUrl} target="_blank" className="text-blue-700 visited:text-violet-500">
            https://www.w3schools.com
          </a>
        )}
      </div>

      {imageUrls && (
        <Image
          src={imageUrls[0]}
          className="rounded-lg object-fit"
          alt={title}
          width={100}
          height={100}
        />
      )}
    </div>
  );
}
