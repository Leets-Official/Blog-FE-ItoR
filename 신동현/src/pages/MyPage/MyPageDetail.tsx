import styled from "styled-components";
import { Kakao, ProfilePlus } from "@/assets";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  background-color: #F5F5F5;
  margin-bottom: 50px;
`;

const ProfileContainer = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
  gap: 20px;
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const ProfileImageContainer = styled.div`
  width: 100%;
`;

const ProfileContentContainer = styled.div`
  width: 100%;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  gap: 20px;
  margin-bottom: 50px;
`;

const InputContainer = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 25px;
  @media (max-width: 700px) {
    width: 90%;
  }
`;
const SocialBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialBoxContext = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
`;

const SocialBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  width: 100%;
  background: #E6e6e6;
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
      <Input title="메일" type="text" placeholder="이메일" value="ahksjhd@gmail.com" onChange={() => { }} />
      <Input title="비밀번호" type="password" placeholder="비밀번호" value="12345678" onChange={() => { }} />
      <Input title="비밀번호 확인" type="password" placeholder="비밀번호 확인" value="12345678" onChange={() => { }} />
      <Input title="이름" type="text" placeholder="이름" value="" onChange={() => { }} />
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" value="" onChange={() => { }} />
    </InputContainer>
  )
}
const KaKaoUI = () => {
  return (
    <InputContainer>
      <SocialBoxContainer>
        <SocialBoxTitle>소셜로그인</SocialBoxTitle>
        <SocialBox>
          <SocialBoxContext>
            <Kakao />
            카카오 로그인
          </SocialBoxContext>
        </SocialBox>
      </SocialBoxContainer>
      <Input title="이메일" type="email" placeholder="111@naver.com" value="" disabled={true} onChange={() => { }} />
      <Input title="이름" type="text" placeholder="신동동" value="" disabled={true} onChange={() => { }} />
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" value="" onChange={() => { }} />
    </InputContainer>
  )
}

const Mypage = () => {
  const location = useLocation();
  const type = location.search.split("=")[1];

  return (
    <Wrapper>
      <TopContainer>
        <ProfileContainer>
          <ProfileImageContainer>
            <Button
              width="64px"
              height="64px"
              backgroundColor="#F5F5F5"
              icon={<ProfilePlus width="64px" height="64px" />}
              onClick={() => { }}
            />
          </ProfileImageContainer>
          <ProfileContentContainer>
            <Input type="text" placeholder="닉네임" value="닉네임" onChange={() => { }} subTitle="* 20글자 이내" style={{ fontSize: "24px", fontWeight: "500", color: "#000000", backgroundColor: "#F5F5F5" }} />
            <Input type="text" placeholder="한 줄 소개" value="한 줄 소개" onChange={() => { }} style={{ fontSize: "14px", fontWeight: "300", color: "#000000", backgroundColor: "#F5F5F5" }} />
          </ProfileContentContainer>
        </ProfileContainer>
      </TopContainer>
      <BottomContainer>
        {type === "email" ? <EmailUI /> : <KaKaoUI />}
      </BottomContainer>
    </Wrapper>
  )
}

export default Mypage;  
