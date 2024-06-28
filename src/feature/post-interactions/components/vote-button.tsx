import { Icon } from '@iconify/react';
import React from 'react';
import { Button } from '~/components/ui/button';
import { upVote, downVote } from '~/feature/posts/posts-slice';
import { useAppDispatch } from '~/store/hooks';
interface Props {
  voteCount: number;
  postId: string;
}

export function VoteButton({ voteCount, postId }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    e.stopPropagation();
  };

  const handleUpVote = () => {
    dispatch(upVote({ postId }));
  };

  const handleDownVote = () => {
    dispatch(downVote({ postId }));
  };

  return (
    <div className="flex items-center   bg-slate-200 rounded-full" onClick={handleClick}>
      <Button
        className="p-2 hover:bg-slate-300 rounded-full hover:text-red-400"
        size="icon"
        variant={'ghost'}
        onClick={handleUpVote}
      >
        <Icon icon="mynaui:fat-arrow-up" className=" size-4" />
      </Button>

      <span>{voteCount}</span>

      <Button
        className="p-2 hover:bg-slate-300 rounded-full hover:text-blue-600"
        size="icon"
        variant={'ghost'}
        onClick={handleDownVote}
      >
        <Icon icon="mynaui:fat-arrow-down" className=" size-4 " />
      </Button>
    </div>
  );
}
