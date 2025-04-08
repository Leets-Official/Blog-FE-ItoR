import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GITLOG, Kakao, Divider } from '@/assets';
import Button from '@/components/ui/Button';

const SignupContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 782px;
  padding: 80px 0px;
  justify-content: center;
  align-items: center;
  margin: 80px auto;

  @media (max-width: 700px) {
    flex-direction: column;
    width: 80%;
  }
`;

const SignupLeftSection = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0 0 12px 0;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const SignupRightSection = styled.div`
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

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-width: 240px;
`;

const StyledText = styled.span`
  font-size: 12px;
  padding: 2px 8px 4px 8px;
  line-height: 160%;
  font-weight: 400;
  color: #909090;
  font-family: 'Noto Sans R';
`;

const SignupOption = () => {
  const navigate = useNavigate();
  const handleEmailSignup = () => {
    navigate('/signup');
  };

  const handleKakaoSignup = () => {
    navigate('/signup/kakao');
  };
  return (
    <SignupContainer>
      <SignupLeftSection>
        <LogoWrapper>
          <GITLOG width={282.692} height={76.029} fill='#000' />
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
      </SignupLeftSection>

      <SignupRightSection>
        <Button
          onClick={handleEmailSignup}
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
          이메일로 회원가입
        </Button>
        <TextContainer>
          <Divider width={123} stroke='#f5f5f5' />
          <StyledText>또는</StyledText>
          <Divider width={123} stroke='#f5f5f5' />
        </TextContainer>
        <Button
          onClick={handleKakaoSignup}
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
          <Kakao width={18} height={18} /> 카카오로 회원가입
        </Button>
      </SignupRightSection>
    </SignupContainer>
  );
};

export default SignupOption;
