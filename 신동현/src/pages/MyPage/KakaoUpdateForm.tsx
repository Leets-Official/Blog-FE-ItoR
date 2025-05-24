import { Kakao } from "@/assets";
import Input from "@/components/ui/Input";
import { useContext } from "react";
import styled from "styled-components";
import { SocialControlContext } from "@/contexts/SocialControlContext";
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

const KaKaoUpdateForm = () => {
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
      <Input title="이메일" type="email" placeholder="111@naver.com" disabled={true} control={control} name="email" />
      <Input title="이름" type="text" placeholder="신동동" disabled={true} control={control} name="birth" />
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" disabled={true} control={control} name="birth" />
    </InputContainer>
  )
}

export default KaKaoUpdateForm;
