export type PostAtom = {
  type: "paragraph" | "image";
  url?: string;
  file?: File;
  content: string;
};

export interface Content {  
  contentOrder: string;
  content: string;
  contentType: string;
}

export interface Comment {
  commentId: string;
  content: string;
  nickName: string;
  isOwner: boolean;
}

export interface PostContent {
  postId: string;
  title: string;
  contents: Content[];
  isOwner: boolean;
  comments: Comment[];
  nickName: string;
  profileUrl: string;
  createdAt: string;
}

export interface PostListResponse {
  post: PostContent[];
  pageMax: number;
}

export interface PostListProps {
  totalPostCount: number;
  loadMyPage?: boolean;
}


