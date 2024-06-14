import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "~/store";
import dayjs from "dayjs";

const selectPosts = (state: RootState) => state.postsSlice.posts;
const selectSearchParams = (
  state: RootState,
  searchParams: { [key: string]: string | string[] | undefined }
) => searchParams;

export const selectSortedPosts = createSelector(
  [selectPosts, selectSearchParams],
  (posts, searchParams) => {
    let filteredPosts = [...posts];

    if (searchParams.sortBy === "name") {
      if (searchParams.order === "asc") {
        filteredPosts = filteredPosts.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }
      if (searchParams.order === "desc") {
        filteredPosts = filteredPosts.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }
    }

    if (searchParams.sortBy === "date") {
      if (searchParams.order === "asc") {
        filteredPosts = filteredPosts.sort((a, b) => {
          if (dayjs(a.createdAt).isBefore(dayjs(b.createdAt))) {
            return 1;
          }
          if (dayjs(a.createdAt).isAfter(dayjs(b.createdAt))) {
            return -1;
          }
          return 0;
        });
      }
      if (searchParams.order === "desc") {
        filteredPosts = filteredPosts.sort((a, b) => {
          if (dayjs(a.createdAt).isBefore(dayjs(b.createdAt))) {
            return -1;
          }
          if (dayjs(a.createdAt).isAfter(dayjs(b.createdAt))) {
            return 1;
          }
          return 0;
        });
      }
    }
    return filteredPosts;
  }
);
