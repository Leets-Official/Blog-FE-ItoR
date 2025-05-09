import { GITLOG, Kakao } from "@/assets";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SignButton from "@/components/ui/Button/SignButton";
import { KakaoLogin } from "@/api/login/login";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  margin-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;

  @media (max-width: 700px) {
    margin-top: 100px;
    flex-direction: column;
  }  
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 114px;
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  @media (max-width: 700px) {
    height: 90px;
  }  
`;

const Title = styled.h1`
  height: 62px;
  width: 668px;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  margin-left: 30%;

  @media (max-width: 700px) {
    align-items: center;
    margin-left: 50px;
  }  
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    margin-top: 0px;
  }
`;

const SubContent = styled.p`
  font-size: 14px;
  color: #909090;

  @media (max-width: 700px) {
    font-size: 12px;
    margin-top: 10px;
  }
`;

const ImageSubContent = styled(SubContent)`
  font-size: 14px;
  color: #909090;
  padding-top: 20px;
  margin-top: 20px;

  @media (max-width: 700px) {
    font-size: 12px;
    margin-top: 10px;
  }
`;

const ButtonContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (max-width: 700px) {
    justify-content: start;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();

  const handleEmailSignUp = () => {
    navigate("/signUp/detail/email");
  };

  const handleKakaoSignUp = () => {
    KakaoLogin();
  };

  return (
    <Container>
      <TitleContainer>
        <Title>회원가입</Title>
      </TitleContainer>
      <ContentContainer>
        <ImageContainer>
          <GITLOG fill="black" />
          <ImageSubContent>
            You can make anything by writing
          </ImageSubContent>
        </ImageContainer>
        <ButtonContainer>
          <SignButton disabled={false} onClick={handleEmailSignUp} type="email">이메일로 회원가입</SignButton>
          <SubContent>또는</SubContent>
          <SignButton disabled={false} onClick={handleKakaoSignUp} icon={<Kakao />} type="kakao">카카오로 회원가입</SignButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default SignUp;

