import React from 'react';
import { VoteButton } from './vote-button';
import { Comment } from './comment';

export function Interactions() {
  return (
    <div className="flex gap-2">
      <VoteButton />
      <Comment />
    </div>
  );
}
