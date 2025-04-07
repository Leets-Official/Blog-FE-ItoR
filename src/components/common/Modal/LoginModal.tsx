import { flexCenter, flexColumnCenter } from '@/styles/common.styled';
import BaseModal from '@/components/common/Modal/BaseModal';
import styled from 'styled-components';
import { LineSvg, LogoSvg, KakaoSvg, CloseSvg } from '@/assets/index';
import { Text } from '@/components/home/PostItem';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { FlexRow } from '@/components/common/SideBar/SideBar.styled';

export const Wrapper = styled.div`
  ${flexCenter}
  gap: 80px;
  height: 490px;
  background-color: ${({ theme }) => theme.COLORS.black};
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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onRequestClose={onClose} maxWidth="880px">
      <Wrapper>
        <CloseButton onClick={onClose}>
          <CloseSvg />
        </CloseButton>
        <LeftSection>
          <LogoSvg fill="white" width="308px" height="160px" />
          <Text color="gray56" fontSize="sm" fontWeight="light">
            You can make anything by writing
          </Text>
        </LeftSection>
        <RightSection>
          <Input placeholder="이메일" />
          <Input placeholder="비밀번호" />
          <Button variant="primary" size="lg" rounded="md" fullWidth>
            이메일로 로그인
          </Button>
          <FlexRow>
            <LineSvg />
            <Text color="gray56" fontSize="xs" fontWeight="regular">
              SNS
            </Text>
            <LineSvg />
          </FlexRow>
          <Button variant="kakao" size="lg" rounded="md" fullWidth>
            <KakaoSvg /> 카카오로 로그인
          </Button>
          <Text color="gray56" fontSize="xs" fontWeight="regular">
            또는 회원가입
          </Text>
        </RightSection>
      </Wrapper>
    </BaseModal>
  );
};

export default LoginModal;
