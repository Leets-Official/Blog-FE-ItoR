import { Profile } from "@/assets";
import styled from "styled-components";
import { useState } from "react";
import LoginModal from "../ui/LoginModal";
import SideBarButton from "../ui/Button/ActionButton";
import Button from "../ui/Button/Button";

const SideBarContainer = styled.div`
  float: left;
  top: 0;
  left: 0;
  right: 0;
  width: 240px;
  height: 100vh;
  background-color: #F5F5F5;
  position: fixed;
  z-index: 98;
`;

const Container = styled.div`
  padding-top: 130px;
  padding-left: 16px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Nickname = styled.h2`
  font-size: 24px;
  width: 80%;
  color: #333333;
  padding-top: 10px;
`;

const Bio = styled.p<{
  paddingTop?: string;
}>`
  font-size: 14px;
  width: 80%;
  height: 44px;
  padding-top: ${(props) => props.paddingTop || "5px"};
  color: #333333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 5px;
`;

const FooterButtonContainer = styled(ButtonContainer)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-left: 16px;
  padding-bottom: 16px;
`;

interface FrameProps {
  isLogin: boolean;
}



const LoginedContainer = () => {
  return (
    <Container>
      <ProfileContainer>
        <Button onClick={() => { }} icon={<Profile />} width="40px" height="40px"></Button>
      </ProfileContainer>
      <Nickname>%닉네임</Nickname>
      <Bio paddingTop="5px">%한 줄 소개</Bio>
      <ButtonContainer>
        <SideBarButton onClick={() => { }} type="blue">나의 깃로그</SideBarButton>
        <SideBarButton onClick={() => { }} type="blue">깃로그 쓰기</SideBarButton>
      </ButtonContainer>
      <FooterButtonContainer>
        <SideBarButton onClick={() => { }} type="gray">설정</SideBarButton>
        <SideBarButton onClick={() => { }} type="gray">로그아웃</SideBarButton>
      </FooterButtonContainer>
    </Container>
  )
}

const NotLoginedContainer = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  }

  return (
    <Container>
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
      <Bio paddingTop="10px">You can make anything by writing</Bio>
      <ButtonContainer>
        <SideBarButton onClick={openLoginModal} type="blue" width="117px">깃로그 시작하기</SideBarButton>
      </ButtonContainer>

      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
    </Container>
  )
}

const SideBar = ({ isLogin }: FrameProps) => {
  return (
    <SideBarContainer>
      {isLogin ? (
        <LoginedContainer />
      ) : (
        <NotLoginedContainer />
      )}
    </SideBarContainer>
  );
};

export default SideBar;
