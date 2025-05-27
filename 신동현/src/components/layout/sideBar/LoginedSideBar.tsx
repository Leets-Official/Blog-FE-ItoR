import { Profile } from "@/assets"
import Button from "@/components/ui/Button/Button"
import SideBarButton from "@/components/ui/Button/ActionButton"
import styled from "styled-components"
import Modal from "@/components/ui/Modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "@/components/ui/Image";

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
  font-weight: 500;
  width: 80%;
  color: #333333;
  margin-bottom: 0px;
`;

const Bio = styled.p`
  font-size: 14px;
  font-weight: 300;
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


const LoginedSideBar = () => {
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  }

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  }

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }

  const nickName = localStorage.getItem("nickName");
  const profilePicture = localStorage.getItem("profilePicture");
  const bio = localStorage.getItem("bio");

  return (
    <Container>
      <ProfileContainer>
        <Button onClick={() => { navigate(`/mypage/${nickName}`) }} icon={profilePicture ? <Image src={profilePicture} alt="profile" width="64px" height="64px" style={{ borderRadius: "50%" }} /> : <Profile width="64px" height="64px" />} width="40px" height="40px"></Button>
        <Nickname>{nickName}</Nickname>
        <Bio>{bio}</Bio>
      </ProfileContainer>
      <ButtonContainer>
        <SideBarButton onClick={() => { navigate(`/mypage/${nickName}`) }} type="blue">나의 깃로그</SideBarButton>
        <SideBarButton onClick={() => { navigate("/write") }} type="blue">깃로그 쓰기</SideBarButton>
      </ButtonContainer>
      <FooterButtonContainer>
        <SideBarButton onClick={() => { }} type="gray">설정</SideBarButton>
        <SideBarButton onClick={openLogoutModal} type="gray">로그아웃</SideBarButton>
      </FooterButtonContainer>

      <Modal open={isLogoutModalOpen} onClose={closeLogoutModal} title="로그아웃을 진행할게요" onCancel={closeLogoutModal} onConfirm={onLogout} cancelText="취소" confirmText="로그아웃" cancelType="default" confirmType="positive" />
    </Container>
  )
}

export default LoginedSideBar;  