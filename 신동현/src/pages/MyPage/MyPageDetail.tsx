import styled from "styled-components";
import { Kakao, ProfilePlus } from "@/assets";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input";
import { Outlet, useLocation } from "react-router-dom";
import { signUpEmailSchema, signUpSocialSchema } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailControlContext } from "@/contexts/EmailControlContext";
import Header from "@/components/layout/header/Header";
import { useAtomValue } from "jotai";
import { isModifyAtom } from "@/Atoms/atoms";
import { useEffect, useState } from "react";
import { UserInfo } from "@/api/user/userInfo";
import { SocialControlContext } from "@/contexts/SocialControlContext";

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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const isModify = useAtomValue(isModifyAtom);
  
  const { control: controlEmail, setValue: setValueEmail, handleSubmit: handleSubmitEmail } = useForm<z.infer<typeof signUpEmailSchema>>({
    resolver: zodResolver(signUpEmailSchema),
    defaultValues: {
      email: "",
      password: "qweasd123!",
      passwordCheck: "qweasd123!",
      name: "테스트입니다",
      birth: "2023-10-10",
      nickname: "",
      bio: "",
    },
  });

  const { control: controlSocial, setValue: setValueSocial, handleSubmit: handleSubmitSocial } = useForm<z.infer<typeof signUpSocialSchema>>({
    resolver: zodResolver(signUpSocialSchema),
    defaultValues: {
      email: "",
      birth: "",
      nickname: "",
      bio: "2023-10-10",
    },
  });

  useEffect(() => {
    if (!isModify) {
      const initUserInfo = async () => {
        const userInfo = await UserInfo();
        if (type === "email") {
          setValueEmail("email", userInfo.data.email);
          setValueEmail("nickname", userInfo.data.nickname);
          setValueEmail("bio", localStorage.getItem("bio") ?? "");
          setProfileImage(userInfo.data.profilePicture);
          console.log(userInfo.data);
        } else {
          setValueSocial("email", userInfo.data.email);
          setValueSocial("nickname", userInfo.data.nickname);
          setValueSocial("bio", userInfo.data.bio);
          setProfileImage(userInfo.data.profilePicture);
        }
      }
      initUserInfo();
    }
  }, [isModify]);

  const onSubmit = async (data: z.infer<typeof signUpEmailSchema>) => {
    console.log(data);
  }

  return (
    <Wrapper>
      <Header type="mypage" onPublish={handleSubmitEmail(onSubmit)}/>
      <TopContainer>
        <ProfileContainer>
          <ProfileImageContainer>
            <Button
              width="64px"
              height="64px"
              backgroundColor="#F5F5F5"
              icon={profileImage ? <img src={profileImage} alt="profile" /> : <ProfilePlus width="64px" height="64px" />}
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
          {type === "email" ? <EmailControlContext.Provider value={{ control: controlEmail }}><Outlet /></EmailControlContext.Provider> : <SocialControlContext.Provider value={{ control: controlSocial }}><Outlet /></SocialControlContext.Provider>}
        </InputContainer>
      </BottomContainer>
    </Wrapper>
  )
}

export default MyPageDetail;  
