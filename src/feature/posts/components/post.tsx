import React from 'react';
import { Post as IPost } from '../types';

interface PostProps extends IPost {}

export function Post({ title, imageUrls, text, linkUrl }: PostProps) {
  return (
    <div className="flex flex-col gap-2 hover:bg-slate-100 rounded-lg px-4 py-2">
      <div className="flex gap-2 text-xs">
        <div className="font-semibold">an8ar</div>
        <div className="text-gray-400">7 hr. ago</div>
      </div>
      <div className="text-xl font-semibold">{title}</div>
      {imageUrls && <Image src={imageUrls[0]} />}
      {text && <Text text={text} />}
      {linkUrl && <Link url={linkUrl} />}
    </div>
  );
}

function Image({ src }: { src: string }) {
  return <img src={src} className=" rounded-lg object-contain bg-black" />;
}

function Link({ url }: { url: string }) {
  return (
    <a href={url} target="_blank" className="text-blue-700 visited:text-violet-500">
      https://www.w3schools.com
    </a>
  );
}

function Text({ text }: { text: string }) {
  return <p className="text-sm text-gray-600">{text}</p>;
}
