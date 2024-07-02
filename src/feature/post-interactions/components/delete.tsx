import { Icon } from '@iconify/react';
import React from 'react';
import { Button } from '~/components/ui/button';
import { useDeletePost } from '../hooks/use-delete-post';
interface Props {
  postId: string;
}

export function Delete({ postId }: Props) {
  const handleDelete = useDeletePost();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    const buttonElement = event.currentTarget;

    buttonElement.addEventListener(
      'transitionend',
      () => {
        handleDelete(postId);
      },
      { once: true },
    );
  };

  return (
    <Button
      className="delete-button rounded-full bg-slate-200 p-2 transition duration-200 ease-in-out hover:scale-125 hover:bg-slate-300 active:scale-50 active:text-red-400 active:duration-1000"
      size="icon"
      variant={'ghost'}
      onClick={handleClick}
    >
      <Icon icon="mdi:trash-outline" className="size-4" />
    </Button>
  );
}
