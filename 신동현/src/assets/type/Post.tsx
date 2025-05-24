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
}

export type PostAtom = {
  type: "paragraph" | "image";
  url?: string;
  file?: File;
  content: string;
};