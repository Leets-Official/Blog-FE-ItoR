import { useLocation } from "react-router-dom";
import Header from "@/components/layout/header/header";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import { Add_photo_gray, Kakao, Profile } from "@/assets";
import Input from "@/components/ui/Input";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

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

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30%;
  margin-top: 120px; 
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 193px;
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

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 25px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 40px 0px 40px 0px;
`;

const SocialBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 20px;
  width: 656px;
  background: #E6e6e6;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 300;
  color: #909090;
`;

const SocialBoxTitle = styled.div`
  margin-left: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 300;
  color: #909090;
`;


const EmailUI = () => {
  return (
    <InputContainer>
      <Input title="이메일" type="text" placeholder="이메일" value="" onChange={() => { }} />
      <Input title="비밀번호" type="password" placeholder="비밀번호" value="" onChange={() => { }} />
      <Input title="비밀번호 확인" type="password" placeholder="비밀번호 확인" value="" onChange={() => { }} />
      <Input title="이름" type="text" placeholder="이름" value="" onChange={() => { }} />
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" value="" onChange={() => { }} />
      <Input title="닉네임" type="text" placeholder="닉네임" subTitle="* 20글자 이내" value="" onChange={() => { }} />
      <Input title="한 줄 소개" type="text" placeholder="한 줄 소개" value="" onChange={() => { }} />
    </InputContainer>
  )
}

const KaKaoUI = () => {
  return (
    <InputContainer>
      <SocialBoxContainer>
        <SocialBoxTitle>소셜로그인</SocialBoxTitle>
        <SocialBox>
          <Kakao />
          카카오 로그인
        </SocialBox>
      </SocialBoxContainer>
      <Input title="이메일" type="email" placeholder="111@naver.com" value="" disabled={true} onChange={() => { }} />
      <Input title="이름" type="text" placeholder="신동동" value="" disabled={true} onChange={() => { }} />
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" value="" onChange={() => { }} />
      <Input title="닉네임" type="text" placeholder="닉네임" subTitle="* 20글자 이내" value="" onChange={() => { }} />
      <Input title="한 줄 소개" type="text" placeholder="한 줄 소개" value="" onChange={() => { }} />
    </InputContainer>
  )
}

const SignUpDetail = () => {
  const location = useLocation();
  const type = location.search.split("=")[1];

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const openConfirmModal = () => {
    setIsOpenConfirmModal(true);
  }

  const closeConfirmModal = () => {
    setIsOpenConfirmModal(false);
  }

  return (
    <>
      <Header />
      <TitleContainer>
        <TitleContentContainer>
          <Title>회원가입</Title>
          <SubTitle>가입을 위해 회원님의 정보를 입력해주세요.</SubTitle>
        </TitleContentContainer>
      </TitleContainer>
      <MainContainer>
        <ProfileContainer>
          <ProfileContent>프로필 사진</ProfileContent>
          <ProfileChangeContainer>
            <Button onClick={() => { }} icon={<Profile />} width="40px" height="40px" style={{ paddingLeft: "30px" }}></Button>
            <Button onClick={() => { }} icon={<Add_photo_gray />} fontSize="12px" width="130px" height="25px" color="#909090" backgroundColor="#FFFFFF" style={{ border: "1px solid #E6E6E6" }}>프로필 사진 추가</Button>
          </ProfileChangeContainer>
        </ProfileContainer >
        {type === "email" ? <EmailUI /> : <KaKaoUI />}
        <ButtonContainer>
          <Button width="656px" height="38px" backgroundColor="#FFFFFF" color="#00A1FF" style={{ borderRadius: "25px", border: "1px solid #00A1FF" }} onClick={openConfirmModal}>회원가입</Button>
        </ButtonContainer>
      </MainContainer>
      <Modal open={isOpenConfirmModal} title="회원가입이 완료되었습니다!" onCancel={closeConfirmModal} onConfirm={() => { }} onClose={closeConfirmModal} cancelText="확인" confirmText="로그인하기" cancelType="negative" confirmType="positive" animation="fadeIn">
      </Modal>
    </>
  )
}

export default SignUpDetail;
