import { LogoSvg, LineSvg, KakaoSvg } from '@/assets';
import Button from '@/components/common/Button/Button';
import { LeftSection, RightSection, Wrapper } from '@/components/common/Modal/LoginModal';
import { FlexRow } from '@/components/common/SideBar/SideBar.styled';
import { Text } from '@/components/home/PostItem';
import { useNavigate } from 'react-router-dom';

const SignupSelection: React.FC = () => {
  const nav = useNavigate();

  const handleSelect = (type: 'email' | 'kakao') => {
    nav(`/signup/${type}`);
  };

  return (
    <Wrapper bgColor="white">
      <LeftSection>
        <LogoSvg width="308px" height="160px" />
        <Text color="gray56" fontSize="sm" fontWeight="light">
          You can make anything by writing
        </Text>
      </LeftSection>
      <RightSection>
        <Button
          variant="primary"
          size="lg"
          rounded="md"
          fullWidth
          onClick={() => handleSelect('email')}
        >
          이메일로 회원가입
        </Button>
        <FlexRow>
          <LineSvg stroke="#f5f5f5" />
          <Text color="gray56" fontSize="xs" fontWeight="regular">
            또는
          </Text>
          <LineSvg stroke="#f5f5f5" />
        </FlexRow>
        <Button
          variant="kakao"
          size="lg"
          rounded="md"
          fullWidth
          onClick={() => handleSelect('kakao')}
        >
          <KakaoSvg /> 카카오로 회원가입
        </Button>
      </RightSection>
    </Wrapper>
  );
};

export default SignupSelection;
