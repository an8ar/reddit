import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { Post, PostsState } from "./types";
import dayjs from "dayjs";
const initialState: PostsState = {
  posts: [
    {
      id: "1",
      title: "ansar",
      text: "serikbayev",
      createdAt: new Date("2024-03-22").toISOString(),
    },
    {
      id: "2",
      title: "cristiano",
      text: "ronaldo",
      createdAt: new Date("2024-02-15").toISOString(),
    },
    {
      id: "3",
      title: "ansar",
      imageUrls: [
        "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
      ],
      createdAt: new Date("2024-05-29").toISOString(),
    },
  ],
};

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      },
      prepare: (
        postType: "text" | "image" | "link",
        content: string | string[], // Change content to accept an array for image URLs
        title: string
      ) => {
        const id = nanoid();
        const createdAt = new Date().toISOString();
        let post: Post;

        switch (postType) {
          case "text":
            post = { id, createdAt, title, text: content as string };
            break;
          case "image":
            post = { id, createdAt, title, imageUrls: content as string[] }; // Cast to string[]
            break;
          case "link":
            post = { id, createdAt, title, linkUrl: content as string };
            break;
          default:
            throw new Error("Invalid post type");
        }

        return { payload: post };
      },
    },
    deletePost(state, action: PayloadAction<{ postId: string }>) {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload.postId
      );
    },
    sortByName(state, action: PayloadAction<{ asc: boolean }>) {
      if (action.payload.asc === true) {
        state.posts = state.posts.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else {
        state.posts = state.posts.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }
    },
    sortByDate(state, action: PayloadAction<{ dateAsc: boolean }>) {
      if (action.payload.dateAsc === true) {
        state.posts = state.posts.sort((a, b) => {
          if (dayjs(a.createdAt).isBefore(dayjs(b.createdAt))) {
            return 1;
          }
          if (dayjs(a.createdAt).isAfter(dayjs(b.createdAt))) {
            return -1;
          }
          return 0;
        });
      } else {
        state.posts = state.posts.sort((a, b) => {
          if (dayjs(a.createdAt).isBefore(dayjs(b.createdAt))) {
            return -1;
          }
          if (dayjs(a.createdAt).isAfter(dayjs(b.createdAt))) {
            return 1;
          }
          return 0;
        });
      }
    },
    resetState() {
      return initialState;
    },
  },
});

export const { addPost, sortByName, sortByDate, resetState } =
  postsSlice.actions;
export default postsSlice.reducer;
