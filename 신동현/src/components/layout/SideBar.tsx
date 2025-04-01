import { Profile } from "@/assets";
import styled from "styled-components";
import { useState } from "react";
import LoginModal from "../ui/LoginModal";
import SideBarButton from "../ui/Button/ActionButton";
import Button from "../ui/Button/Button";

const SideBarContainer = styled.div`
  float: left;
  width: 240px;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 99;
`;

const Container = styled.div`
  padding-left: 16px;
  padding-top: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  margin-left: 16px;
  margin-top: 10px;
`;

const Nickname = styled.h2`
  font-size: 24px;
  width: 80%;
  color: #333333;
  margin-bottom: 0px;
`;

const Bio = styled.p`
  font-size: 14px;
  width: 80%;
  height: 22px;
  color: #333333;
  margin-top: 5px;
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

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
}



const LoginedContainer = () => {
  return (
    <Container>
      <ProfileContainer>
        <Button onClick={() => { }} icon={<Profile width="64px" height="64px" />} width="40px" height="40px"></Button>
        <Nickname>%닉네임</Nickname>
        <Bio>%한 줄 소개</Bio>
      </ProfileContainer>
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
        <Bio>You can make anything by writing</Bio>
      </ProfileContainer>
      <ButtonContainer>
        <SideBarButton onClick={openLoginModal} type="blue" width="117px">깃로그 시작하기</SideBarButton>
      </ButtonContainer>

      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
    </Container>
  )
}

const SideBar = ({ isOpen, onClose, isLogin }: SideBarProps) => {
  if (!isOpen) return null;
  return (
    <Overlay onClick={onClose}>
      <SideBarContainer onClick={(e) => e.stopPropagation()}>
        {isLogin ? (
          <LoginedContainer />
        ) : (
          <NotLoginedContainer />
        )}
      </SideBarContainer>
    </Overlay>
  );
};

export default SideBar;
