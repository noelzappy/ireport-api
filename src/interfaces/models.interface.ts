import { User } from './users.interface';

export interface Media {
  id?: number;
  url: string;
  type: string;
  postId: number;
}

export interface Post {
  id?: number;
  title?: string;
  content: string;
  userId: number;

  author?: User;
}

export interface PostWithMedia extends Post {
  media: Media[];
}
