export interface Content {  
  content: string;
  contentType: string;
}

export interface PostContent {
  title: string;
  contents: Content[];
  nickName: string;
  profileUrl: string;
  createdAt: string;
  commentCount: number;
}

export interface PostListResponse {
  data: {
    post: PostContent[];
    totalPostCount: number;
  }
}
