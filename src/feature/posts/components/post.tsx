import React from "react";
import { Post as IPost } from "../types";
import Image from "next/image";
interface Props extends IPost {}

export function Post({ title, imageUrls, text, linkUrl }: Props) {
  return (
    <div className="flex flex-col gap-2 hover:bg-slate-100 rounded-lg px-4 py-2">
      <div className="flex gap-2 text-xs">
        <div className="font-semibold">an8ar</div>
        <div className="text-gray-400">7 hr. ago</div>
      </div>
      <div className="text-xl font-semibold">{title}</div>

      {imageUrls && (
        <>
          <Image
            src={imageUrls[0]}
            className=" rounded-lg object-contain bg-black"
            alt={title}
            width={100}
            height={100}
          />
        </>
      )}
      {text && <p className="text-sm text-gray-600">{text}</p>}
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          className="text-blue-700 visited:text-violet-500"
        >
          https://www.w3schools.com
        </a>
      )}
    </div>
  );
}
