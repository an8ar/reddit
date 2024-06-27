import React from 'react';
import { VoteButton } from './vote-button';
import { Comment } from './comment';
import { Delete } from './delete';

interface Props {
  postId: string;
  voteCount: number;
}
export function Interactions(props: Props) {
  return (
    <div className="flex gap-2">
      <VoteButton {...props} />
      <Comment />
      <Delete postId={props.postId} />
    </div>
  );
}
