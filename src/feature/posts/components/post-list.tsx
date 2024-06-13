"use client";
import React from "react";
import { useAppSelector } from "~/store/hooks";
import { Post } from "./post";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import { useSelector } from "react-redux";
import { selectSortedPosts } from "../selector";
import { RootState } from "~/store";
TimeAgo.addDefaultLocale(en);

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function PostList({ searchParams }: Props) {
  const posts = useSelector((state: RootState) =>
    selectSortedPosts(state, searchParams)
  );
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <article className=" flex flex-col gap-2" key={post.id}>
            <Post {...post} />
            <div className="border-t border-gray-200 " />
          </article>
        ))
      ) : (
        <div>No posts</div>
      )}
    </div>
  );
}
