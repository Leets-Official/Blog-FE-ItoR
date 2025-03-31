import Header from "@/components/layout/header/Header";
import { GITLOG_Black, Kakao } from "@/assets";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

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
  font-weight: 700;
  color: #000000;
  margin-left: 30%;

  @media (max-width: 700px) {
    align-items: center;
    margin-left: 50px;
  }  
`;

const ImageContainer = styled.div`
  width: 400px;
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
  width: 400px;
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
    navigate("/signUp/detail?type=email");
  };

  const handleKakaoSignUp = () => {
    navigate("/signUp/detail?type=kakao");
  };

  return (
    <Container>
      <Header />
      <TitleContainer>
        <Title>회원가입</Title>
      </TitleContainer>
      <ContentContainer>
        <ImageContainer>
          <GITLOG_Black />
          <ImageSubContent>
            You can make anything by writing
          </ImageSubContent>
        </ImageContainer>
        <ButtonContainer>
          <Button width="300px" height="45px" fontSize="14px" color="#ffffff" backgroundColor="#00A1FF" disabled={false} onClick={handleEmailSignUp} style={{
            border: "none",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}>이메일로 회원가입</Button>
          <SubContent>또는</SubContent>
          <Button width="300px" height="45px" fontSize="15px" color="000000" backgroundColor="#FEE500" disabled={false} onClick={handleKakaoSignUp} icon={<Kakao />} style={{
            border: "none",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}>카카오로 회원가입</Button>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default SignUp;

