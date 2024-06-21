export interface Post {
  id: string;
  createdAt: string;
  title: string;
  text?: string;
  imageUrls?: string[];
  linkUrl?: string;
  voteCount: number;
}

export interface PostsState {
  posts: Post[];
  form?: FormValuesProps;
}
export type FormType = 'text' | 'image';

export type FormValuesProps = Omit<Post, 'id' | 'createdAt' | 'voteCount'>;
