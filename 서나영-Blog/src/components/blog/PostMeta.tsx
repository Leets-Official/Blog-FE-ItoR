import styled from 'styled-components';
import { BlogPost } from '@/types/blogPost';
import { Profile, Dot } from '@/assets';
import { formatPostDate } from '@/utils/date';

const MetaContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 6px;
  padding: 12px 0;
`;

const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;

const StyledNickName = styled.span`
  height: 19px;
  color: #333;
  font-family: 'Noto Sans R';
  font-size: 12px;
  font-weight: 400;
  line-height: 160%;
`;

const StyledCreateAt = styled.span`
  height: 19px;
  color: #909090;
  font-family: 'Noto Sans L';
  font-size: 12px;
  font-weight: 300;
  line-height: 160%;
`;

const StyledCommentCount = styled.span`
  height: 19px;
  color: #909090;
  font-family: 'Noto Sans L';
  font-size: 12px;
  font-weight: 300;
  line-height: 160%;
`;

interface PostMetaProps {
  post: BlogPost;
}

const PostMeta: React.FC<PostMetaProps> = ({ post }) => {
  return (
    <MetaContainer>
      {post.profileImageUrl ? (
        <ProfileImage src={post.profileImageUrl} alt='profile' />
      ) : (
        <Profile width={20} height={20} />
      )}
      <StyledNickName>{post.nickName}</StyledNickName>
      <Dot />
      <StyledCreateAt>{formatPostDate(post.createAt)}</StyledCreateAt>
      <Dot />
      <StyledCommentCount>댓글 {post.commentCount}</StyledCommentCount>
    </MetaContainer>
  );
};

export default PostMeta;
