import styled from "styled-components";
import { Kakao, ProfilePlus } from "@/assets";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input";
import { Outlet, useLocation } from "react-router-dom";
import { signUpEmailSchema } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailControlContext } from "@/contexts/EmailControlContext";
import Header from "@/components/layout/header/Header";
import { useAtomValue } from "jotai";
import { isModifyAtom } from "@/Atoms/atoms";

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



const MyPageDetail = () => {
  const type = useLocation().pathname.split("/")[3];
  const isModify = useAtomValue(isModifyAtom);
  
  const { control: controlEmail, handleSubmit: handleSubmitEmail } = useForm<z.infer<typeof signUpEmailSchema>>({
    resolver: zodResolver(signUpEmailSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      birth: "",
      nickname: "",
      bio: "",
    },
  });

  return (
    <Wrapper>
      <Header type="mypage" />
      <TopContainer>
        <ProfileContainer>
          <ProfileImageContainer>
            <Button
              width="64px"
              height="64px"
              backgroundColor="#F5F5F5"
              icon={<ProfilePlus width="64px" height="64px" />}
              onClick={() => { }}
              disabled={!isModify}
            />
          </ProfileImageContainer>
          <ProfileContentContainer>
            <Input type="text" placeholder="닉네임" control={controlEmail} name="nickname" subTitle="* 20글자 이내" style={{ fontSize: "24px", fontWeight: "500", color: "#000000", backgroundColor: "#F5F5F5" }} disabled={!isModify} />
            <Input type="text" placeholder="한 줄 소개" control={controlEmail} name="bio" style={{ fontSize: "14px", fontWeight: "300", color: "#000000", backgroundColor: "#F5F5F5" }} disabled={!isModify} />
          </ProfileContentContainer>
        </ProfileContainer>
      </TopContainer>
      <BottomContainer>
        <InputContainer>
          <EmailControlContext.Provider value={{ control: controlEmail }}><Outlet /></EmailControlContext.Provider>
        </InputContainer>
      </BottomContainer>
    </Wrapper>
  )
}

export default MyPageDetail;  
