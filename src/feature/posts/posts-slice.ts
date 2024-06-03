import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { Post, PostsState } from './types';

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      },
      prepare: (
        postType: 'text' | 'image' | 'link',
        content: string | string[], // Change content to accept an array for image URLs
        title: string,
      ) => {
        const id = nanoid();
        const createdAt = new Date().toISOString();
        let post: Post;

        switch (postType) {
          case 'text':
            post = { id, createdAt, title, text: content as string };
            break;
          case 'image':
            post = { id, createdAt, title, imageUrls: content as string[] }; // Cast to string[]
            break;
          case 'link':
            post = { id, createdAt, title, linkUrl: content as string };
            break;
          default:
            throw new Error('Invalid post type');
        }

        return { payload: post };
      },
    },
    deletePost(state, action: PayloadAction<{ postId: string }>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload.postId);
    },
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
