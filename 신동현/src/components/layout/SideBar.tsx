import Button from "@/components/ui/Button";
import { Profile } from "@/assets";
import styled from "styled-components";
import { useState } from "react";
import LoginModal from "../ui/1LoginModal";

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

const Title = styled.h2`
  font-size: 24px;
  width: 80%;
  color: #333333;
  padding-top: 10px;
`;

const SubTitle = styled.p<{
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
      <Title>%닉네임</Title>
      <SubTitle paddingTop="5px">%한 줄 소개</SubTitle>
      <ButtonContainer>
        <Button onClick={() => { }} color="#00A1FF" backgroundColor="#FFFFFF" fontSize="14px" width="99px" height="38px" style={{ borderRadius: "25px", border: "1px solid #2196F3" }}>나의 깃로그</Button>
        <Button onClick={() => { }} color="#00A1FF" backgroundColor="#FFFFFF" fontSize="14px" width="99px" height="38px" style={{ borderRadius: "25px", border: "1px solid #2196F3" }}>깃로그 쓰기</Button>
      </ButtonContainer>
      <FooterButtonContainer>
        <Button onClick={() => { }} color="#909090" backgroundColor="#FFFFFF" fontSize="14px" width="99px" height="38px" style={{ borderRadius: "25px", border: "1px solid #909090" }}>설정</Button>
        <Button onClick={() => { }} color="#909090" backgroundColor="#FFFFFF" fontSize="14px" width="99px" height="38px" style={{ borderRadius: "25px", border: "1px solid #909090" }}>로그아웃</Button>
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
      <SubTitle paddingTop="10px">You can make anything by writing</SubTitle>
      <ButtonContainer>
        <Button onClick={openLoginModal} color="#00A1FF" backgroundColor="#FFFFFF" fontSize="14px" height="38px" style={{ borderRadius: "25px", border: "1px solid #2196F3" }}>깃로그 시작하기</Button>
      </ButtonContainer>

      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
    </Container>
  )
}

const SideBar = ({ isLogin }: FrameProps) => {
  return (
    <SideBarContainer>
      {isLogin === true ? (
        <LoginedContainer />
      ) : (
        <NotLoginedContainer />
      )}
    </SideBarContainer>
  );
};

export default SideBar;
