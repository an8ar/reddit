import React from 'react';
import { VoteButton } from './vote-button';
import { Comment } from './comment';

interface Props {
  postId: string;
  voteCount: number;
}
export function Interactions(props: Props) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div className="flex gap-2" onClick={handleClick}>
      <VoteButton {...props} />
      <Comment />
    </div>
  );
}
