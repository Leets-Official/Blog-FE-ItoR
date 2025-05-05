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
}

export interface BlogPostDetail {
  postId: string;
  title: string;
  contents: {
    contentOrder: number;
    content: string;
    contentType: 'TEXT' | 'IMAGE';
  }[];
  isOwner: boolean;
  comments: {
    commentId: number;
    content: string;
    nickName: string;
    isOwner: boolean;
  }[];
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
