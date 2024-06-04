export interface Post {
  id: string;
  createdAt: string;
  title: string;
  text?: string;
  imageUrls?: string[];
  linkUrl?: string;
}

export interface PostsState {
  posts: Post[];
}
export type FormType = "text" | "image";
