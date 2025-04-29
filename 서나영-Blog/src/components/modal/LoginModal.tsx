import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '@/schema/auth';
import styled, { css } from 'styled-components';
import { GITLOG, Kakao, Divider, Clear } from '@/assets';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { emailLogin } from '@/api/auth/emailLoginAPI';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
};

const LoginModalContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 782px;
  padding: 120px 0px;
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

const LogoWrapper = styled.div`
  display: flex;
  height: 106px;
  width: 308px;
  min-width: 240px;
  padding: 0px 18px;
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
`;

const SnsText = styled.span`
  font-size: 12px;
  padding: 2px 8px 4px 8px;
  color: #909090;
  font-family: 'Noto Sans R';
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
  font-weight: 300;
  margin: 2px;
  align-self: stretch;
  font-family: 'Noto Sans L';
`;

const SignUpButton = styled.div`
  cursor: pointer;
  font-size: 12px;
  font-weight: 300;
  color: #909090;
  padding: 4px 8px 4px 8px;
  font-family: 'Noto Sans R';
`;

const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const { nickname } = await emailLogin(data);
      console.log(`${nickname}님 환영합니다!`);
      onLoginSuccess?.();
      onClose();
    } catch (error) {
      console.log('로그인 실패');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup/select');
  };

  const handleKakaoLogin = async () => {
    try {
      const kakaoLink = `${BASE_URL}/auth/kakao`;
      window.location.href = kakaoLink;
    } catch (err) {
      alert('카카오 로그인 URL을 불러오지 못했습니다.');
    }
  };

  return (
    <LoginModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <LoginModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label='닫기'>
          <Clear width={'24px'} height={'24px'} fill='#FFF' />
        </CloseButton>
        <LoginLeftSection>
          <LogoWrapper>
            <GITLOG width={282.692} height={76.029} fill='#FFF' />
          </LogoWrapper>
          <p
            style={{
              color: '#909090',
              fontWeight: 300,
              lineHeight: '160%',
              letterSpacing: '-0.07px',
              fontSize: '14px',
              fontFamily: 'Noto Sans L',
              marginBottom: '33px',
            }}
          >
            You can make anything by writing
          </p>
        </LoginLeftSection>

        <LoginRightSection>
          <InputWrapper>
            <TextInput
              {...register('email')}
              name='email'
              type='email'
              placeholder='이메일'
              width='100%'
              maxWidth='312px'
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            <TextInput
              {...register('password')}
              name='password'
              type='password'
              placeholder='비밀번호'
              width='100%'
              maxWidth='312px'
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </InputWrapper>
          <Button
            onClick={handleSubmit(onSubmit)}
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
            <Divider width={123} stroke='#909090' />
            <SnsText>SNS</SnsText>
            <Divider width={123} stroke='#909090' />
          </SnsContent>
          <Button
            onClick={handleKakaoLogin}
            width='100%'
            height='46px'
            style={{
              fontFamily: 'AppleSDGothicNeoM',
              fontSize: '14px',
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
          <SignUpButton onClick={handleSignUpClick}>또는 회원가입</SignUpButton>
        </LoginRightSection>
      </LoginModalContainer>
    </LoginModalOverlay>
  );
};

export default LoginModal;
