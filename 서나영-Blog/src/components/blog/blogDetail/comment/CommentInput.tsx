import { useState } from 'react';
import styled from 'styled-components';
import CommentMeta from './CommentMeta';
import Button from '@/components/ui/Button';
import { BlogPostDetail } from '@/types/blogPost';
import { useToast } from '@/components/ui/Toast';
import { createComment, updateComment } from '@/api/blog/commentAPI';

const CommentInputWrapper = styled.div`
  padding: 12px 16px;
  margin-bottom: 64px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 688px;
  margin: 32px auto 0;
  padding: 12px 16px;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  height: 112px;
  border: none;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 0;
  font-size: 14px;
  font-family: 'Noto Sans L';
  resize: none;
  outline: none;

  &::placeholder {
    color: #c8c8c8;
  }
`;

const StyledButton = styled(Button)<{ $active: boolean }>`
  border-radius: 25px;
  border: 1px solid #909090;
  background: ${({ $active }) => ($active ? '#000' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#909090')};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  width: 64px;
  height: 38px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-self: stretch;
`;

const LoginMessage = styled.span`
  width: 100%;
  height: 116px;
  color: #333;
  font-family: 'Noto Sans L';
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
  letter-spacing: -0.07px;
`;

interface CommentInputProps {
  post: BlogPostDetail;
  isLogin: boolean;
  onSuccess?: () => void;
  initialValue?: string;
  isEditMode?: boolean;
  commentId?: string;
  onCancel?: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  post,
  isLogin,
  onSuccess,
  initialValue,
  isEditMode,
  commentId,
  onCancel,
}) => {
  const [value, setValue] = useState(initialValue || '');
  const { showToast } = useToast();

  const handleSubmit = async () => {
    if (!value.trim()) return;

    try {
      if (isEditMode && commentId) {
        await updateComment(commentId, value);
      } else {
        await createComment(post.postId, value);
      }
      setValue('');
      onSuccess?.();
    } catch (e) {
      console.error(isEditMode ? '댓글 수정 실패:' : '댓글 작성 실패:', e);
      showToast(isEditMode ? '댓글 수정에 실패했습니다.' : '댓글 작성에 실패했습니다.', 'negative');
    }
  };

  if (!isLogin) {
    return (
      <CommentInputWrapper>
        <CommentInputContainer>
          <LoginMessage>로그인을 하고 댓글을 달아보세요!</LoginMessage>
        </CommentInputContainer>
      </CommentInputWrapper>
    );
  }

  return (
    <CommentInputWrapper>
      <CommentInputContainer>
        <CommentMeta post={post} isInput />
        <CommentTextarea
          placeholder='댓글을 입력하세요.'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ButtonWrapper>
          {isEditMode && onCancel && (
            <StyledButton $active={false} onClick={onCancel}>
              취소
            </StyledButton>
          )}
          <StyledButton $active={value.trim().length > 0} onClick={handleSubmit}>
            등록
          </StyledButton>
        </ButtonWrapper>
      </CommentInputContainer>
    </CommentInputWrapper>
  );
};

export default CommentInput;
