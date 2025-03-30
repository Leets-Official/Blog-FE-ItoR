import { useLocation } from "react-router-dom";
import Header from "@/components/layout/header/header";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import { Add_photo_gray, Profile } from "@/assets";
import Input from "@/components/ui/Input";

const TitleContainer = styled.div`
  width: 100%;
  height: 148px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  background-color: #F5F5F5;
  @media (max-width: 700px) {
    height: 90px;
  }  
`;

const TitleContentContainer = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30%;
`;

const Title = styled.h1`
  height: 38px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 0px;


  @media (max-width: 700px) {
    align-items: center;
    margin-left: 50px;
  }  
`;

const SubTitle = styled.p`
  height: 22px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  color: #333333;

  @media (max-width: 700px) {
    align-items: center;
    margin-left: 50px;
  }  
`;

const InputContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30%;
  margin-top: 50px; 
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProfileContent = styled.p`
  width: 100%;
  height: 22px;
  font-size: 14px;
  font-weight: 300;
  color: #909090;
`;

const ProfileChangeContainer = styled.div`
  width: 117px;
  height: 131px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

const SignUpDetail = () => {
  const location = useLocation();
  const type = location.search.split("=")[1];

  console.log(location);

  return (
    <>
      <Header />
      <TitleContainer>
        <TitleContentContainer>
          <Title>회원가입</Title>
          <SubTitle>가입을 위해 회원님의 정보를 입력해주세요.</SubTitle>
        </TitleContentContainer>
      </TitleContainer>
      <InputContainer>
        <ProfileContainer>
          <ProfileContent>프로필 사진</ProfileContent>
          <ProfileChangeContainer>
            <Button onClick={() => { }} icon={<Profile />} width="40px" height="40px" style={{ paddingLeft: "30px" }}></Button>
            <Button onClick={() => { }} icon={<Add_photo_gray />} fontSize="12px" width="130px" height="25px" color="#909090" backgroundColor="#FFFFFF" style={{ border: "1px solid #E6E6E6" }}>프로필 사진 추가</Button>
          </ProfileChangeContainer>
          <Input title="이메일" width="100%" height="40px" type="text" placeholder="이메일" value="" onChange={() => { }} />
        </ProfileContainer>
      </InputContainer>
    </>
  )
}

export default SignUpDetail;
