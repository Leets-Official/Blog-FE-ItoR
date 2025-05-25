import Input from "@/components/ui/Input"
import { signUpEmailSchema } from "@/schema/auth";
import styled from "styled-components";
import { EmailControlContext } from "@/contexts/EmailControlContext";
import { Control } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";
import { isModifyAtom } from "@/Atoms/atoms";
import { useAtomValue } from "jotai";

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 25px;
`;

const EmailUpdateForm = () => {
  const emailContext = useContext(EmailControlContext) as { control: Control<z.infer<typeof signUpEmailSchema>> };
  const { control } = emailContext;
  const isModify = useAtomValue(isModifyAtom);
  return (
    <InputContainer>
      <Input title="메일" type="text" placeholder="이메일" control={control} name="email" disabled={true} />
      <Input title="비밀번호" type="password" placeholder="비밀번호" control={control} name="password" disabled={!isModify} />
      <Input title="비밀번호 확인" type="password" placeholder="비밀번호 확인" control={control} name="passwordCheck" disabled={!isModify} />
      <Input title="이름" type="text" placeholder="이름" control={control} name="name" disabled={true} />
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" control={control} name="birth" disabled={true} />
    </InputContainer>
  )
}

export default EmailUpdateForm;
