import { Profile } from '@/assets';
import Button from '@/components/ui/Button';
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
  font-weight: 500;
  line-height: 160%;
`;

const Description = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
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

const LoginSide = () => {
  return (
    <SideContainer>
      <ContentContainer>
        <ProfileContainer>
          <Profile width='64' height='64' />
        </ProfileContainer>
        <TextContainer>
          <Nickname>닉네임</Nickname>
          <Description>한 줄 소개</Description>
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
        >
          로그아웃
        </Button>
      </BottomButtonContainer>
    </SideContainer>
  );
};

export default LoginSide;
