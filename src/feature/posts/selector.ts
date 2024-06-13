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
      filteredPosts = filteredPosts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (searchParams.sortBy === "date") {
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
    return filteredPosts;
  }
);
