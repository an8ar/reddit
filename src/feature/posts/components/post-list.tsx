"use client";
import React from "react";
import { useAppSelector } from "~/store/hooks";
import { Post } from "./post";
export function PostList() {
  const posts = useAppSelector((state) => state.postsSlice.posts);

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
