import { flexCenter, flexColumnCenter } from '@/styles/common.styled';
import BaseModal from '@/components/common/Modal/BaseModal';
import styled from 'styled-components';
import { LineSvg, LogoSvg, KakaoSvg, CloseSvg } from '@/assets/index';
import { Text } from '@/components/home/PostItem';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { FlexRow } from '@/components/common/SideBar/SideBar.styled';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/context/ModalContext';
import { loginApi } from '@/api/auth/auth';
import { LoginSchema, loginSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const Wrapper = styled.div<{ bgColor?: string; height?: string }>`
  ${flexCenter}
  gap: 80px;
  height: ${({ height }) => height ?? '490px'};
  background-color: ${({ theme, bgColor }) => bgColor ?? theme.COLORS.black};
  padding: 40px;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    min-height: 600px;
    gap: 60px;
    padding: 80px 24px 40px 24px;
  }
`;

export const LeftSection = styled.div`
  ${flexColumnCenter}
  gap:28px;

  @media (max-width: 768px) {
    svg {
      width: 250px;
      height: 120px;
    }
  }
`;

export const RightSection = styled.div`
  ${flexColumnCenter}
  gap:10px;
  max-width: 320px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 4px;
`;

export const SignupText = styled(Text)`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme }) => theme.COLORS.gray[56]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginModal: React.FC = () => {
  const { isOpen, closeModal, modalType } = useModal();
  const nav = useNavigate();

  if (modalType !== 'login') return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginSchema) => {
    try {
      const res = await loginApi(data);
      console.log('로그인 성공:', res.data);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      closeModal();
      nav('/');
    } catch (error: any) {
      console.error('로그인 실패:', error);
      if (error.response?.status === 401) {
        const message = error.response.data.message || '로그인에 실패했습니다';
        setError('password', { message });
      } else {
        console.error('로그인 중 오류 발생', error);
      }
    }
  };

  return (
    <BaseModal isOpen={isOpen} onRequestClose={closeModal} maxWidth="880px">
      <Wrapper>
        <CloseButton onClick={closeModal}>
          <CloseSvg />
        </CloseButton>
        <LeftSection>
          <LogoSvg fill="white" width="308px" height="160px" />
          <Text color="gray56" fontSize="sm" fontWeight="light">
            You can make anything by writing
          </Text>
        </LeftSection>
        <RightSection as="form" onSubmit={handleSubmit(handleLogin)}>
          <Input
            placeholder="이메일"
            type="email"
            {...register('email')}
            errorMessage={errors.email?.message}
          />
          <Input
            placeholder="비밀번호"
            type="password"
            {...register('password')}
            errorMessage={errors.password?.message}
          />
          <Button variant="primary" size="lg" rounded="md" fullWidth type="submit">
            이메일로 로그인
          </Button>
          <FlexRow>
            <LineSvg stroke="#333" />
            <Text color="gray56" fontSize="xs" fontWeight="regular">
              SNS
            </Text>
            <LineSvg stroke="#333" />
          </FlexRow>
          <Button variant="kakao" size="lg" rounded="md" fullWidth>
            <KakaoSvg /> 카카오로 로그인
          </Button>
          <SignupText
            onClick={() => {
              closeModal();
              nav('/signup');
            }}
          >
            또는 회원가입
          </SignupText>
        </RightSection>
      </Wrapper>
    </BaseModal>
  );
};

export default LoginModal;
