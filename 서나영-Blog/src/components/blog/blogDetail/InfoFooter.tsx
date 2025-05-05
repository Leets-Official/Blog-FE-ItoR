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
  padding: 0 16px;
`;

const NickName = styled.div`
  color: #000;
  font-size: 32px;
  font-weight: 500;
  padding: 24px 16px 0 16px;
`;

const Description = styled.div`
  color: #333;
  font-family: 'Noto Sans L';
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.07px;
  padding: 12px 16px;
`;

interface InfoFooterProps {
  post: BlogPost;
}

const InfoFooter: React.FC<InfoFooterProps> = () => {
  const profilePicture = localStorage.getItem('profilePicture') || '';
  const nickname = localStorage.getItem('nickname') || '닉네임';
  const introduction = localStorage.getItem('introduction') || 'You can make anything by writing';

  return (
    <InfoFooterWrapper>
      <ContentWrapper>
        {profilePicture ? (
          <ProfileImage src={profilePicture} alt='프로필 이미지' />
        ) : (
          <Profile width={60} height={60} />
        )}
        <NickName>{nickname}</NickName>
        <Description>{introduction}</Description>
      </ContentWrapper>
    </InfoFooterWrapper>
  );
};

export default InfoFooter;
