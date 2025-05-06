import { Text } from '@/components/home/PostItem';
import styled from 'styled-components';
import { flexColumn, flexColumnCenter } from '@/styles/common.styled';
import { Comment } from '@/types/post';
import { Textarea, Button, Image } from '@/components';
import { formatPostDate } from '@/utils/formatPostDate';
import { DefaultProfileSvg, MeatballSvg } from '@/assets';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { postCommentApi } from '@/api/comment/comment.api';

const CommentSectionWrapper = styled.div`
  ${flexColumn}
  gap: 40px;
  width: 100%;
`;

const FlexColumn = styled.div`
  ${flexColumnCenter}
  gap: 4px;
`;

const ColumnItems = styled.div`
  ${flexColumn}
  gap:20px;
`;

const CommentInputWrapper = styled.div`
  ${flexColumn}
  width: 100%;
  gap: 8px;
  padding: 16px;
  margin-bottom: 80px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[90]};
  border-radius: 4px;
`;

const CommentInputTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const TextareaWrapper = styled.div`
  ${flexColumn}
  gap: 8px;
  width: 100%;
`;

interface CommentSectionProps {
  postId: string;
  commentCount: number;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, commentCount, comments }) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [newComment, setNewComment] = useState<string>('');
  const { user, isLoggedIn } = useUser();

  const hasComments = comments.length > 0;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      await postCommentApi(postId, newComment.trim());
      const newCommentData: Comment = {
        id: Date.now(),
        nickname: user?.nickname || '',
        profileImage: user?.profilePicture || '',
        createdAt: new Date().toISOString(),
        content: newComment.trim(),
      };

      setCommentList((prev) => [...prev, newCommentData]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 등록 실패: ', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  return (
    <CommentSectionWrapper>
      <Text fontSize="md" fontWeight="medium">
        댓글 <span style={{ color: '#00a1ff' }}>{commentCount}</span>
      </Text>

      {hasComments ? (
        commentList.map((comment) => (
          <div key={comment.id}>
            <CommentListWrapper>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Image
                  src={comment.profileImage}
                  alt="user-profile"
                  width="24px"
                  height="24px"
                  borderRadius="50%"
                  objectFit="cover"
                />
                <ColumnItems>
                  <div>
                    <Text fontSize="sm" color="gray20">
                      {comment.nickname}
                    </Text>
                    <Text fontSize="xs" color="gray56">
                      {formatPostDate(comment.createdAt)}
                    </Text>
                  </div>
                  <Text fontSize="sm">{comment.content}</Text>
                </ColumnItems>
              </div>
              <MeatballSvg style={{ cursor: 'pointer' }} />
            </CommentListWrapper>
          </div>
        ))
      ) : (
        <FlexColumn>
          <Text fontSize="sm" color="gray78">
            작성된 댓글이 없습니다.
          </Text>
          <Text fontSize="sm" color="gray78">
            응원의 첫 번째 댓글을 달아주세요.
          </Text>
        </FlexColumn>
      )}

      {isLoggedIn && user ? (
        <CommentInputWrapper>
          <CommentInputTop>
            {user?.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt="내 프로필"
                width="24px"
                height="24px"
                borderRadius="50%"
                objectFit="cover"
              />
            ) : (
              <DefaultProfileSvg width="24px" height="24px" />
            )}
            <Text fontSize="sm" fontWeight="regular" color="gray20">
              {user?.nickname}
            </Text>
          </CommentInputTop>

          <TextareaWrapper>
            <Textarea
              placeholder="댓글을 입력하세요."
              placeholderSize="sm"
              placeholderColor="gray20"
              rows={5}
              hasBorder={false}
              value={newComment}
              onChange={handleCommentChange}
            />

            <SubmitButtonWrapper>
              <Button
                variant={newComment.trim() ? 'secondary-black' : 'secondary'}
                size="xs"
                rounded="full"
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
              >
                등록
              </Button>
            </SubmitButtonWrapper>
          </TextareaWrapper>
        </CommentInputWrapper>
      ) : (
        <CommentInputWrapper>
          <Textarea
            placeholder="로그인하고 댓글을 달아보세요!"
            inputColor="gray20"
            inputSize="sm"
            placeholderColor="gray20"
            placeholderSize="sm"
            hasBorder={false}
          />
        </CommentInputWrapper>
      )}
    </CommentSectionWrapper>
  );
};

export default CommentSection;
