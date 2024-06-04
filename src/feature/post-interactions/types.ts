export interface PostInteraction {
  postId: string;
  voteCount: number;
}

export interface PostInteractionState {
  interactions: PostInteraction[];
}
