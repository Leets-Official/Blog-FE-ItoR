import Input from "@/components/ui/Input"
import { signUpEmailSchema } from "@/schema/auth";
import styled from "styled-components";
import { EmailControlContext } from "@/contexts/EmailControlContext";
import { Control } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 25px;
`;

const EmailForm = () => {
  const emailContext = useContext(EmailControlContext) as { control: Control<z.infer<typeof signUpEmailSchema>> };
  const { control } = emailContext;
  return (
    <InputContainer>
      <Input title="이메일" type="text" placeholder="이메일" control={control} name="email" />
      <Input title="비밀번호" type="password" placeholder="비밀번호" control={control} name="password" />
      <Input title="비밀번호 확인" type="password" placeholder="비밀번호 확인" control={control} name="passwordCheck" />
      <Input title="이름" type="text" placeholder="이름" control={control} name="name" />
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" control={control} name="birth" />
      <Input title="닉네임" type="text" placeholder="닉네임" control={control} name="nickname" />
      <Input title="한 줄 소개" type="text" placeholder="한 줄 소개" control={control} name="bio" />
    </InputContainer>
  )
}

export default EmailForm;
