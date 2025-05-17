import styled from 'styled-components';
import CommentMeta from '@/components/blog/blogDetail/comment/CommentMeta';
import { BlogPostDetail, BlogComment } from '@/types/blogPost';

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 688px;
  flex-direction: column;
  margin: 0 auto 20px;
`;

const CommentText = styled.span`
  padding: 12px 16px;
  margin-left: 26px;
  color: #333;
  font-family: 'Noto Sans L';
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.07px;
`;

interface CommentProps {
  post: BlogPostDetail;
  comment: BlogComment;
}

const Comment: React.FC<CommentProps> = ({ post, comment }) => {
  return (
    <CommentWrapper>
      <CommentMeta post={post} />
      <CommentText>{comment.content}</CommentText>
    </CommentWrapper>
  );
};

export default Comment;
