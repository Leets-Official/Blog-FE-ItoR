export interface Post {
  id: number;
  title: string;
  content: string;
  nickName: string;
  createAt: string;
  image?: string;
  commentCount: number;
  comments: Comment[];
  profileImage?: string;
}

export interface Comment {
  id: number;
  nickName: string;
  profileImage: string;
  createAt: string;
  content: string;
}
