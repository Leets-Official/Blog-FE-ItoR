export interface BlogPost {
  postId: string;
  title: string;
  contents: BlogPostContent[];
  comments: BlogComment[];
  nickName: string;
  createdAt: string;
  profileUrl: string;
  isOwner: boolean;
}

export interface BlogPostContent {
  contentOrder: number;
  content: string;
  contentType: 'TEXT' | 'IMAGE';
}

export interface BlogComment {
  commentId: number;
  content: string;
  nickName: string;
  isOwner: boolean;
}
