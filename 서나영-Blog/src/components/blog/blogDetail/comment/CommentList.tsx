import styled from 'styled-components';
import { useState } from 'react';
import Comment from '@/components/blog/blogDetail/comment/Comment';
import { BlogPostDetail } from '@/types/blogPost';
import CommentInput from '@/components/blog/blogDetail/comment/CommentInput';

const CommentListContainer = styled.div`
  width: 100%;
  max-width: 688px;
  margin: 0 auto;
  overflow-x: hidden;
`;

const CommentCountWrapper = styled.div`
  display: flex;
  max-width: 688px;
  padding: 16px 16px 12px 16px;
  margin-bottom: 20px;
`;

const CommentLabel = styled.span`
  font-family: 'Noto Sans M';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.04px;
  color: #000;
`;

const CommentCount = styled.span`
  font-family: 'Noto Sans M';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.04px;
  color: #00a1ff;
  margin-left: 4px;
`;

const NoCommentText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 16px;
  margin-bottom: 20px;
  white-space: pre-line;

  color: #c8c8c8;
  text-align: center;
  font-family: 'Noto Sans L';
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.07px;
`;

interface CommentListProps {
  post: BlogPostDetail;
  postId: string;
  onCommentSubmit: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ post, onCommentSubmit }) => {
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const isLogin = !!localStorage.getItem('accessToken');

  const { comments } = post;

  return (
    <CommentListContainer>
      <CommentCountWrapper>
        <CommentLabel>댓글</CommentLabel>
        <CommentCount>{comments.length}</CommentCount>
      </CommentCountWrapper>

      {comments.length === 0 ? (
        <NoCommentText>
          작성된 댓글이 없습니다. {'\n'} 응원의 첫 번째 댓글을 달아주세요.
        </NoCommentText>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.commentId}
            comment={comment}
            post={post}
            onDeleteSuccess={onCommentSubmit}
            isEditing={editCommentId === comment.commentId}
            onEnterEdit={(id) => setEditCommentId(id)}
            onExitEdit={() => setEditCommentId(null)}
          />
        ))
      )}
      <CommentInput post={post} isLogin={isLogin} onSuccess={onCommentSubmit} />
    </CommentListContainer>
  );
};

export default CommentList;
