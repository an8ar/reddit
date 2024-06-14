import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '~/store';
import dayjs from 'dayjs';
import { Post } from './types';

const sortByName = (posts: Post[], order: 'asc' | 'desc') => {
  return posts.sort((a, b) => {
    const comparison = a.title.localeCompare(b.title);
    return order === 'asc' ? comparison : -comparison;
  });
};

const sortByDate = (posts: Post[], order: 'asc' | 'desc') => {
  return posts.sort((a, b) => {
    const comparison = dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? -1 : 1;
    return order === 'asc' ? comparison : -comparison;
  });
};

const selectPosts = (state: RootState) => state.postsSlice.posts;

const selectSearchParams = (
  state: RootState,
  searchParams: { [key: string]: string | string[] | undefined },
) => searchParams;

const sortingHandlers = {
  name: sortByName,
  date: sortByDate,
};

export const selectSortedPosts = createSelector(
  [selectPosts, selectSearchParams],
  (posts, searchParams) => {
    let filteredPosts = [...posts];

    const sortBy = searchParams.sortBy as keyof typeof sortingHandlers;
    const order = searchParams.order as 'asc' | 'desc';

    if (sortBy && order) {
      const sortHandler = sortingHandlers[sortBy];
      if (sortHandler) {
        filteredPosts = sortHandler(filteredPosts, order);
      }
    }

    return filteredPosts;
  },
);
