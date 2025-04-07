import styled from 'styled-components';
import { BlogPost } from '@/types/blogPost';
import { formatPostDate } from '@/utils/date';
import { MoreVert, Profile } from '@/assets';

const CommentMetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 688px;
  height: 65px;
  padding: 0px 16px;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNickName = styled.div`
  color: #333;
  font-family: 'Noto Sans R';
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.07px;
`;

const StyledCreatedAt = styled.span`
  color: #909090;
  font-family: 'Noto Sans L';
  font-size: 12px;
  font-weight: 300;
`;

interface CommentMetaProps {
  post: BlogPost;
  isInput?: boolean;
}

const CommentMeta: React.FC<CommentMetaProps> = ({ post, isInput = false }) => {
  return (
    <CommentMetaContainer>
      <LeftSection>
        {post.profileUrl ? (
          <ProfileImage src={post.profileUrl} alt='profile' />
        ) : (
          <Profile width={20} height={20} />
        )}
        <TextWrapper>
          <StyledNickName>{post.nickName}</StyledNickName>
          {!isInput && <StyledCreatedAt>{formatPostDate(post.createdAt)}</StyledCreatedAt>}
        </TextWrapper>
      </LeftSection>
      {!isInput && (
        <MoreVert width={24} height={24} cursor={'pointer'} style={{ padding: '8px' }} />
      )}
    </CommentMetaContainer>
  );
};

export default CommentMeta;
