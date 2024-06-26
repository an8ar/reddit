'use client';
import React from 'react';
import { useAppSelector } from '~/store/hooks';
import { AutoComplete } from './autocomplete';

export function HeaderInput() {
  const posts = useAppSelector((state) => state.postSlice.posts);

  return <AutoComplete posts={posts} />;
}
