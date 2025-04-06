import { useState } from 'react';
import { Profile } from '@/assets';
import Button from '@/components/ui/Button';
import LoginModal from '@/components/modal/LoginModal';
import styled from 'styled-components';

const SideContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 0px;
`;

const ProfileContainer = styled.div`
  padding: 0px 16px;
`;

const ButtonContainer = styled.div`
  padding: 0px 16px;
`;

const LogoutSide = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SideContainer>
      <ProfileContainer>
        <Profile width='64' height='64' />
      </ProfileContainer>
      <p
        style={{
          color: '#333',
          fontWeight: 300,
          lineHeight: '160%',
          letterSpacing: '-0.07px',
          fontSize: '14px',
          padding: '12px 20px',
          marginBottom: '20px',
        }}
      >
        You can make anything by writing
      </p>
      <ButtonContainer>
        <Button
          type={'None'}
          height={'38px'}
          style={{
            color: '#00A1FF',
            borderRadius: '25px',
            border: '1px solid #00A1FF',
            padding: '8px 12px',
          }}
          onClick={() => setIsModalOpen(true)}
        >
          깃로그 시작하기
        </Button>
      </ButtonContainer>
      {/* 로그인 모달 */}
      {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </SideContainer>
  );
};

export default LogoutSide;
