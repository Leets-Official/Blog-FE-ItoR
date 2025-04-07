import { useState } from 'react';
import styled from 'styled-components';
import CommentMeta from './CommentMeta';
import Button from '@/components/ui/Button';
import { BlogPost } from '@/types/blogPost';

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
  flex-direction: column;
  align-items: flex-end;
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
  post: BlogPost;
  placeholder?: string;
  isLogin: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({ post, placeholder, isLogin }) => {
  const [value, setValue] = useState('');

  if (!isLogin) {
    return (
      <CommentInputContainer>
        <LoginMessage>로그인을 하고 댓글을 달아보세요!</LoginMessage>
      </CommentInputContainer>
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
          <StyledButton $active={value.trim().length > 0}>등록</StyledButton>
        </ButtonWrapper>
      </CommentInputContainer>
    </CommentInputWrapper>
  );
};

export default CommentInput;
