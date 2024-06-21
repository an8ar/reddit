import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { FormValuesProps, Post, PostsState } from './types';
import { initialPosts } from './constants';
import { persistReducer } from 'redux-persist';
import storage from '~/store/persist-storage';

const initialState: PostsState = {
  posts: initialPosts,
};

export const postSlice = createSlice({
  name: 'postSlice',
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
            post = { id, createdAt, title, text: content as string, voteCount: 0 };
            break;
          case 'image':
            post = { id, createdAt, title, imageUrls: content as string[], voteCount: 0 }; // Cast to string[]
            break;
          case 'link':
            post = { id, createdAt, title, linkUrl: content as string, voteCount: 0 };
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
    updateForm(state, action: PayloadAction<FormValuesProps>) {
      state.form = action.payload;
    },
    resetForm(state) {
      state.form = { title: '' };
    },
    upVote(state, action: PayloadAction<{ postId: string }>) {
      const post = state.posts.find((post) => post.id === action.payload.postId);
      if (post) {
        post.voteCount++;
      }
    },
    downVote(state, action: PayloadAction<{ postId: string }>) {
      const post = state.posts.find((post) => post.id === action.payload.postId);
      if (post) {
        post.voteCount--;
      }
    },
  },
});

export const { addPost, updateForm, upVote, downVote } = postSlice.actions;

export const postReducer = persistReducer(
  {
    key: 'rtk:post',
    storage,
    whitelist: ['form'],
  },
  postSlice.reducer,
);

export default postReducer;
