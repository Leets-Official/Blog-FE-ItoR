export interface BlogPostContent {
  contentOrder: number;
  content: string;
  contentType: 'TEXT' | 'IMAGE';
}
export interface BlogPost {
  postId: string;
  title: string;
  contents: BlogPostContent[];
  isOwner: boolean;
  commentCount?: number;
  nickName: string;
  profileUrl: string;
  createdAt: string;
}

export interface BlogPostListResponse {
  post: BlogPost[];
  pageMax: number;
}

export interface BlogPostDetail {
  postId: string;
  title: string;
  contents: BlogPostContent[];
  isOwner: boolean;
  comments: BlogComment[];
  nickName: string;
  profileUrl: string;
  createdAt: string;
}

export interface BlogComment {
  commentId: number;
  content: string;
  nickName: string;
  isOwner: boolean;
}

export interface Block {
  content: string;
  type: 'TEXT' | 'IMAGE';
}
