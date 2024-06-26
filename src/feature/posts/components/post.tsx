'use client';
import React from 'react';
import { Post as IPost } from '../types';
import Image from 'next/image';
import { Interactions } from '~/feature/post-interactions';
import ReactTimeAgo from 'react-time-ago';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface Props extends IPost {}

export function Post({ title, imageUrls, text, linkUrl, createdAt, voteCount, id }: Props) {
  const params = useParams<{ locale: string }>();

  const router = useRouter();

  const pathname = usePathname();

  const handleClick = () => {
    router.push(`${pathname}/post/${id}`);
  };

  return (
    <div
      className="flex flex-col gap-2 rounded-lg px-4 py-2 hover:cursor-pointer hover:bg-slate-100"
      onClick={handleClick}
      id={`post-${id}`}
    >
      <div className="flex gap-2 text-xs">
        <span className="font-semibold">an8ar</span>
        <span className="text-gray-400">
          <ReactTimeAgo date={new Date(createdAt)} locale={params.locale} />
        </span>
      </div>
      <div className="text-xl font-semibold">{title}</div>

      {imageUrls && (
        <Image
          src={imageUrls[0]}
          className="w-full rounded-lg bg-black object-contain"
          alt={title}
          width={600}
          height={600}
        />
      )}

      {text && <p className="text-sm text-gray-600">{text}</p>}

      {linkUrl && (
        <a href={linkUrl} target="_blank" className="text-blue-700 visited:text-violet-500">
          https://www.w3schools.com
        </a>
      )}
      <Interactions voteCount={voteCount} postId={id} />
    </div>
  );
}
