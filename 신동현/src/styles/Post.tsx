export interface Post {
  id: string;
  title: string;
  content: string;
  userProfileImage?: React.ReactNode;
  userName: string;
  writeDate: Date;
  commentCount: number;
  postImage?: React.ReactNode;
}
