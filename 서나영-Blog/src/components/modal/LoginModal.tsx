import react, { useState } from 'react';
import styled, { css } from 'styled-components';
import { GITLOG, Kakao, Divider, Clear } from '@/assets';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModalContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 782px;
  padding: 80px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  background: #111112;

  @media (max-width: 700px) {
    flex-direction: column;
    width: 80%;
  }
`;

const LoginLeftSection = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const LoginRightSection = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  height: 160px;
  min-width: 240px;
  max-width: 344px;
  padding: 0px 18px;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  width: 308px;
  min-width: 240px;
  height: 160px;
  padding: 47px 12px 36px 13px;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 312px;
  padding: 4px 16px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const SnsContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-width: 240px;

  img {
    width: 123px;
  }

  span {
    font-size: 12px;
    padding: 2px 8px 4px 8px;
    line-height: 160%;
    font-weight: 400;
    color: #909090;
  }
`;

const LoginModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(182, 182, 182, 0.5);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`;

const ErrorMessage = styled.p`
  color: #ff3f3f;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  margin: 2px 0 0 6px;
  align-self: stretch;
`;

const SignUpButton = styled.div`
  cursor: pointer;
  font-size: 12px;
  font-weight: 300;
  color: #909090;
  padding: 4px 8px 4px 8px;
`;

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return false;
    } else if (!email.includes('@')) {
      setError('이메일 형식이 적합하지 않습니다.');
      return false;
    } else if (password.length < 6) {
      // 임시 에러 메시지
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = () => {
    if (validateForm()) {
      console.log('로그인 요청');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <LoginModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <LoginModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label='닫기'>
          <Clear width={'24px'} height={'24px'} />
        </CloseButton>
        <LoginLeftSection>
          <LogoContainer>
            <LogoWrapper>
              <GITLOG width={282.692} height={76.029} />
            </LogoWrapper>
          </LogoContainer>
          <p
            style={{
              color: '#909090',
              fontWeight: 300,
              lineHeight: '160%',
              letterSpacing: '-0.07px',
              fontSize: '14px',
            }}
          >
            You can make anything by writing
          </p>
        </LoginLeftSection>

        <LoginRightSection>
          <InputWrapper>
            <TextInput
              name='email'
              type='email'
              placeholder='이메일'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              width='100%'
              maxWidth='312px'
            />
            <TextInput
              name='password'
              type='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              width='100%'
              maxWidth='312px'
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputWrapper>
          <Button
            onClick={handleLogin}
            width='100%'
            height='46px'
            style={{
              maxWidth: '312px',
              color: 'white',
              border: 'None',
              borderRadius: '6px',
              backgroundColor: '#00A1FF',
              gap: '8px',
            }}
          >
            이메일로 로그인
          </Button>
          <SnsContent>
            <Divider />
            <span>SNS</span>
            <Divider />
          </SnsContent>
          <Button
            width='100%'
            height='46px'
            style={{
              maxWidth: '312px',
              color: 'rgba(0, 0, 0, 0.85)',
              border: 'None',
              borderRadius: '6px',
              backgroundColor: '#FEE500',
              gap: '8px',
            }}
          >
            <Kakao width={18} height={18} /> 카카오로 로그인
          </Button>
          <SignUpButton>또는 회원가입</SignUpButton>
        </LoginRightSection>
      </LoginModalContainer>
    </LoginModalOverlay>
  );
};

export default LoginModal;
