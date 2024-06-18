import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '~/store';
import { Post } from './types';
import dayjs from 'dayjs';

const selectPosts = (state: RootState) => state.postsSlice.posts;

const selectSearchParams = (
  state: RootState,
  searchParams: { [key: string]: string | string[] | undefined },
) => searchParams;

const filterByTitle = (posts: Post[], title: string) => {
  return posts.filter((post) => post.title.toLowerCase().includes(title.toLowerCase()));
};

const filterByContentType = (
  posts: Post[],
  searchParams: { [key: string]: string | string[] | undefined },
) => {
  const isText = searchParams.isText === 'true';
  const isImage = searchParams.isImage === 'true';
  const isLink = searchParams.isLink === 'true';
  if (isText || isImage || isLink) {
    return posts.filter((post) => {
      return (
        (isText && post.text) ||
        (isImage && post.imageUrls && post.imageUrls.length > 0) ||
        (isLink && post.linkUrl)
      );
    });
  } else {
    return posts;
  }
};

const sortByName = (posts: Post[], order: 'asc' | 'desc') => {
  return posts.sort((a, b) => {
    const comparison = a.title.localeCompare(b.title);
    return order === 'asc' ? comparison : -comparison;
  });
};

const sortByDate = (posts: Post[], order: 'asc' | 'desc') => {
  return posts.sort((a, b) => {
    const comparison = dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1;
    return order === 'asc' ? comparison : -comparison;
  });
};

const sortingHandlers = {
  name: sortByName,
  date: sortByDate,
};

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchParams],
  (posts, searchParams) => {
    let filteredPosts = [...posts];

    if (searchParams.title) {
      filteredPosts = filterByTitle(filteredPosts, searchParams.title as string);
    }

    filteredPosts = filterByContentType(filteredPosts, searchParams);

    return filteredPosts;
  },
);

export const selectSortedPosts = createSelector(
  [selectFilteredPosts, selectSearchParams],
  (filteredPosts, searchParams) => {
    let sortedPosts = [...filteredPosts];

    const sortBy = searchParams.sortBy as keyof typeof sortingHandlers;
    const order = searchParams.order as 'asc' | 'desc';

    if (sortBy && order) {
      const sortHandler = sortingHandlers[sortBy];
      if (sortHandler) {
        sortedPosts = sortHandler(sortedPosts, order);
      }
    }

    return sortedPosts;
  },
);
