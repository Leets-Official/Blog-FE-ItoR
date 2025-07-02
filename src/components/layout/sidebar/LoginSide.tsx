import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/assets';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import styled from 'styled-components';

const SideContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0px;
  flex-grow: 1;
`;

const ProfileContainer = styled.div`
  padding: 0px 16px;
`;

const TextContainer = styled.div`
  display: flex;
  padding: 12px 20px;
  flex-direction: column;
  gap: 12px;
`;

const Nickname = styled.div`
  color: #000;
  font-size: 24px;
`;

const Description = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.07px;
  font-family: 'Noto Sans L';
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 0px 16px;
  gap: 10px;
`;

const BottomButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 24px 16px;
  margin-top: auto;
`;

interface LoginSideProps {
  onLogout: () => void;
}

const LoginSide = ({ onLogout }: LoginSideProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profilePicture = localStorage.getItem('profilePicture') || '';
  const nickname = localStorage.getItem('nickname') || '닉네임';
  const introduction = localStorage.getItem('introduction') || 'You can make anything by writing';

  const handleMyPageClick = () => {
    navigate('/mypage');
  };

  const handleEditorClick = () => {
    navigate('/blog/editor');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    localStorage.clear();
    onLogout();
    navigate('/');
  };

  return (
    <>
      <SideContainer>
        <ContentContainer>
          <ProfileContainer>
            {profilePicture ? (
              <img
                src={profilePicture}
                alt='프로필 이미지'
                width={64}
                height={64}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <Profile width='64' height='64' />
            )}
          </ProfileContainer>
          <TextContainer>
            <Nickname>{nickname}</Nickname>
            <Description>{introduction}</Description>
          </TextContainer>
          <ButtonContainer>
            <Button
              type={'None'}
              width={'99px'}
              height={'38px'}
              style={{
                color: '#00A1FF',
                borderRadius: '25px',
                border: '1px solid #00A1FF',
                padding: '8px 12px',
              }}
              onClick={handleHomeClick}
            >
              나의 깃로그
            </Button>
            <Button
              type={'None'}
              width={'99px'}
              height={'38px'}
              style={{
                color: '#00A1FF',
                borderRadius: '25px',
                border: '1px solid #00A1FF',
                padding: '8px 12px',
              }}
              onClick={handleEditorClick}
            >
              깃로그 쓰기
            </Button>
          </ButtonContainer>
        </ContentContainer>
        <BottomButtonContainer>
          <Button
            type={'None'}
            width={'99px'}
            height={'38px'}
            style={{
              color: '#909090',
              borderRadius: '25px',
              border: '1px solid #909090',
              padding: '8px 12px',
            }}
            onClick={handleMyPageClick}
          >
            설정
          </Button>
          <Button
            type={'None'}
            width={'99px'}
            height={'38px'}
            style={{
              color: '#909090',
              borderRadius: '25px',
              border: '1px solid #909090',
              padding: '8px 12px',
            }}
            onClick={handleLogoutClick}
          >
            로그아웃
          </Button>
        </BottomButtonContainer>
      </SideContainer>
      <Modal
        title='로그아웃 하시겠습니까?'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
        LeftButtonText='취소'
        RightButtonText='로그아웃'
        RightButtonColor='#00A1FF'
      />
    </>
  );
};

export default LoginSide;
