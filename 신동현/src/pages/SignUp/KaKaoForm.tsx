import { Kakao } from "@/assets";
import Input from "@/components/ui/Input";
import { useContext } from "react";
import styled from "styled-components";
import { SocialControlContext } from "./SignUpDetail";
import { signUpSocialSchema } from "@/schema/auth";
import { Control } from "react-hook-form";
import { z } from "zod";

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 25px;
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

const KaKaoForm = () => {
  const name = localStorage.getItem("name");
  const socialContext = useContext(SocialControlContext) as { control: Control<z.infer<typeof signUpSocialSchema>> };
  const { control } = socialContext;
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
      <Input title="이메일" type="email" placeholder="이메일" control={control} name="email" value={""} />
      <SocialBoxContainer>
        <SocialBoxTitle>이름</SocialBoxTitle>
        <SocialBox>
          <SocialBoxContext>
            {name}
          </SocialBoxContext>
        </SocialBox>
      </SocialBoxContainer>
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" control={control} name="birth" value={""} />
      <Input title="닉네임" type="text" placeholder="닉네임" control={control} name="nickname" value={""} />
      <Input title="한 줄 소개" type="text" placeholder="한 줄 소개" control={control} name="bio" value={""} />
    </InputContainer>
  )
}

export default KaKaoForm;
