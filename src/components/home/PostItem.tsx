export interface Post {
  id: number;
  title: string;
  content: string;
  nickName: string;
  createAt: string;
  image?: string;
  commentCount: number;
}

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>{post.nickName}</div>
      <div>{post.createAt}</div>
      <div>댓글 {post.commentCount}</div>
    </div>
  );
};

export default PostItem;
