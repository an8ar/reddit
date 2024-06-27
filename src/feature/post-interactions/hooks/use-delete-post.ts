import { useCallback } from 'react';
import { useAppDispatch } from '~/store/hooks';
import { deletePost } from '~/feature/posts/posts-slice';

export function useDeletePost() {
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(
    (postId: string) => {
      const postElement = document.getElementById(`post-${postId}`);
      if (postElement) {
        postElement.classList.add('animate-fadeOut');

        postElement.addEventListener(
          'animationend',
          () => {
            dispatch(deletePost({ postId }));
            postElement.remove();
          },
          { once: true },
        );
      }
    },
    [dispatch],
  );

  return handleDelete;
}
