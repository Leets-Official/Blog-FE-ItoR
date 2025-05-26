import styled from 'styled-components';
import { useState } from 'react';
import CommentMeta from '@/components/blog/blogDetail/comment/CommentMeta';
import { BlogPostDetail, BlogComment } from '@/types/blogPost';
import CommentInput from '@/components/blog/blogDetail/comment/CommentInput';

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
  onDeleteSuccess: () => void;
  onEnterEdit: (commentId: string) => void;
  onExitEdit: () => void;
  isEditing?: boolean;
}

const Comment: React.FC<CommentProps> = ({
  post,
  comment,
  onDeleteSuccess,
  onEnterEdit,
  onExitEdit,
  isEditing,
}) => {
  return (
    <>
      {isEditing ? (
        <CommentInput
          post={post}
          isLogin={true}
          initialValue={comment.content}
          isEditMode={true}
          commentId={comment.commentId}
          onCancel={onExitEdit}
          onSuccess={() => {
            onDeleteSuccess();
            onExitEdit();
          }}
        />
      ) : (
        <CommentWrapper>
          <CommentMeta
            post={post}
            commentId={comment.commentId}
            onDeleteSuccess={onDeleteSuccess}
            onEdit={() => onEnterEdit(comment.commentId)}
          />
          <CommentText>{comment.content}</CommentText>
        </CommentWrapper>
      )}
    </>
  );
};

export default Comment;
