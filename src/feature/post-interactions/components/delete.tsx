import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Button } from '~/components/ui/button';
import { deletePost } from '~/feature/posts/posts-slice';
import { useAppDispatch } from '~/store/hooks';

interface Props {
  postId: string;
}

export function Delete({ postId }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(deletePost({ postId }));
  };

  return (
    <Button
      className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full hover:text-red-400 transition ease-in-out hover:scale-125 duration-200 active:scale-75"
      size="icon"
      variant={'ghost'}
      onClick={handleClick}
    >
      <Icon icon="mdi:trash-outline" className="size-4 " />
    </Button>
  );
}
