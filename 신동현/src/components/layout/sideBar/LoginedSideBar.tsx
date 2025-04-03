import { Profile } from "@/assets"
import Button from "@/components/ui/Button/Button"
import SideBarButton from "@/components/ui/Button/ActionButton"
import styled from "styled-components"

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


const LoginedSideBar = () => {
    return (
      <Container>
        <ProfileContainer>
          <Button onClick={() => { }} icon={<Profile width="64px" height="64px" />} width="40px" height="40px"></Button>
          <Nickname>닉네임</Nickname>
          <Bio>한 줄 소개</Bio>
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

export default LoginedSideBar;  