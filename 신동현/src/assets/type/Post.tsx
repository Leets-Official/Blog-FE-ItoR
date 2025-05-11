export interface Post {
  postId: string;
  title: string;
  contents: {
    contentOrder: number;
    content: string;
    contentType: string;
  }[];
  isOwner: boolean;
  commentCount: number;  
  // id: string;
  // title: string;
  // content: string;
  // userProfileImage?: React.ReactNode;
  // userName: string;
  // writeDate: Date;
  // commentCount: number;
  // postImage?: React.ReactNode;
}
