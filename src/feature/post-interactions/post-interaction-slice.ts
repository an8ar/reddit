import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PostInteraction, PostInteractionState } from './types';

const initialState: PostInteractionState = { interactions: [] };

export const postInteractionSlice = createSlice({
  name: 'postInteractionSlice',
  initialState,
  reducers: {
    upVoteById(state, action: PayloadAction<{ id: string }>) {
      const foundIndex = state.interactions.findIndex(
        (interaction) => interaction.postId === action.payload.id,
      );
      if (foundIndex >= 0) {
        state.interactions[foundIndex].voteCount++;
      }
    },
    downVoteById(state, action: PayloadAction<{ id: string }>) {
      const foundIndex = state.interactions.findIndex(
        (interaction) => interaction.postId === action.payload.id,
      );
      if (foundIndex >= 0) {
        state.interactions[foundIndex].voteCount--;
      }
    },
  },
});

export const { upVoteById, downVoteById } = postInteractionSlice.actions;
export default postInteractionSlice.reducer;
