'use client';
import React from 'react';
import { Post as IPost } from '~/feature/posts/types';
import Image from 'next/image';
import { useRouter, usePathname, useParams } from 'next/navigation';

interface Props extends IPost {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function InputPost({ title, imageUrls, text, linkUrl, id, setIsVisible }: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const handleClick = () => {
    setIsVisible(false);

    if (pathname.includes('post')) {
      router.push(`${id}`);
    } else {
      router.push(`${pathname}/post/${id}`);
    }
  };

  return (
    <div
      className="flex justify-between gap-1 hover:bg-slate-100 px-4 py-2 hover:cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <div className="text-sm font-semibold">{title}</div>
        {text && <p className="text-xs text-gray-600">{text}</p>}

        <span className="font-semibold text-xs rounded-2xl bg-slate-200 px-1">an8ar</span>

        {linkUrl && (
          <a href={linkUrl} target="_blank" className="text-blue-700 visited:text-violet-500">
            https://www.w3schools.com
          </a>
        )}
      </div>

      <div>
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
    </div>
  );
}
