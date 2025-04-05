export interface Post {
  id: number;
  title: string;
  content: string;
  nickName: string;
  createAt: string;
  image?: string;
  commentCount: number;
  profileImage?: string;
}
