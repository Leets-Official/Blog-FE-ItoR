import styled from 'styled-components';
import { BlogPost, BlogPostDetail } from '@/types/blogPost';
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
`;

const StyledCreatedAt = styled.span`
  height: 19px;
  color: #909090;
  font-family: 'Noto Sans L';
  font-size: 12px;
  font-weight: 300;
`;

const StyledCommentCount = styled.span`
  height: 19px;
  color: #909090;
  font-family: 'Noto Sans L';
  font-size: 12px;
  font-weight: 300;
`;

type PostMetaProps = {
  post: BlogPost | BlogPostDetail;
  isBlogDetail?: boolean;
};

const BlogMeta: React.FC<PostMetaProps> = ({ post, isBlogDetail = false }) => {
  const profilePicture = post.profileUrl || '';
  const nickName = post.nickName || '닉네임';
  const createdAt = post.createdAt || '';

  const isDetail = (p: BlogPost | BlogPostDetail): p is BlogPostDetail => 'comments' in p;

  const commentCount = isDetail(post) ? post.comments.length : (post.commentCount ?? 0);

  return (
    <MetaContainer>
      {profilePicture ? (
        <ProfileImage src={profilePicture} alt='profile' />
      ) : (
        <Profile width={20} height={20} />
      )}
      <StyledNickName>{nickName}</StyledNickName>
      <Dot />
      <StyledCreatedAt>{formatPostDate(createdAt)}</StyledCreatedAt>
      <Dot />
      <StyledCommentCount>댓글 {commentCount}</StyledCommentCount>
    </MetaContainer>
  );
};

export default BlogMeta;
