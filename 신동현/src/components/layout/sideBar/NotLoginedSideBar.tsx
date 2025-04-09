import { Profile } from "@/assets";
import LoginModal from "@/components/ui/Modal/LoginModal";
import { useState } from "react";   
import styled from "styled-components";
import SideBarButton from "@/components/ui/Button/ActionButton";

const Container = styled.div`
  padding-left: 32px;
  padding-top: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  cursor: pointer;
  margin-top: 10px;
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
  padding-top: 50px;
`;


const NotLoginedSideBar = () => {
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
          <Profile width="64px" height="64px"/>
          <Bio>You can make anything by writing</Bio>
        </ProfileContainer>
        <ButtonContainer>
          <SideBarButton onClick={openLoginModal} type="blue" width="117px">깃로그 시작하기</SideBarButton>
        </ButtonContainer>
  
        <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
      </Container>
    )
  }

export default NotLoginedSideBar;