import styled from 'styled-components';
import { BlogPost } from '@/types/blogPost';
import { Profile } from '@/assets';

const InfoFooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: stretch;
  background-color: #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  padding: 78px 0 124px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 688px;
  width: 100%;
  padding: 0 16px;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;

const NickName = styled.div`
  color: #000;
  font-family: 'Noto Sans M';
  font-size: 32px;
  font-weight: 500;
  line-height: 160%;
  padding-top: 24px;
`;

const Description = styled.div`
  color: #333;
  font-family: 'Noto Sans L';
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
  letter-spacing: -0.07px;
`;

interface InfoFooterProps {
  post: BlogPost;
}

const InfoFooter: React.FC<InfoFooterProps> = ({ post }) => {
  return (
    <InfoFooterWrapper>
      <ContentWrapper>
        {post.profileUrl ? (
          <ProfileImage src={post.profileUrl} alt='프로필 이미지' />
        ) : (
          <Profile width={60} height={60} />
        )}
        <NickName>{post.nickName}</NickName>
        <Description>한 줄 소개</Description>
      </ContentWrapper>
    </InfoFooterWrapper>
  );
};

export default InfoFooter;
