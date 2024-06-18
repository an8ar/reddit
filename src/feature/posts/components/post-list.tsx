'use client';
import React from 'react';
import { Post } from './post';

import { useSelector } from 'react-redux';
import { selectSortedPosts } from '../selector';
import { RootState } from '~/store';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function PostList({ searchParams }: Props) {
  const posts = useSelector((state: RootState) => selectSortedPosts(state, searchParams));

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
