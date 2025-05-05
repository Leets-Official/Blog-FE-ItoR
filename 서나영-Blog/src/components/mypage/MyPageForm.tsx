import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import SignupInput from '../signup/SignupInput';
import { Kakao } from '@/assets';
import { signupSchema, SignupSchema } from '@/schema/auth';
import { getInputFields } from '@/components/constants/inputFields';

const FormContainer = styled.div`
  width: 100%;
  max-width: 688px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  padding: 32px 16px 0px;
  overflow-x: hidden;
  box-sizing: border-box;
  gap: 20px;
`;

const SocialBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 16px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  background-color: #e6e6e6;
  gap: 8px;
  font-size: 14px;
  color: #909090;
  font-family: 'Noto Sans L';
`;

const SocialLabel = styled.div`
  color: #909090;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.07px;
  font-family: 'Noto Sans L';
`;

const MyPageForm = ({ editable = false }: { editable?: boolean }) => {
  const [isKakaoLogin, setIsKakaoLogin] = useState(true);
  const inputFields = getInputFields(isKakaoLogin);

  const {
    register,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  return (
    <FormContainer>
      {isKakaoLogin && (
        <>
          <SocialLabel>소셜 로그인</SocialLabel>
          <SocialBox>
            <Kakao width={18} height={18} />
            카카오 로그인
          </SocialBox>
        </>
      )}
      {inputFields.map((field) => {
        const isAlwaysDisabled = field.name === 'email' || field.name === 'name';

        return (
          <SignupInput
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            error={
              !field.disabled && editable
                ? errors[field.name as keyof SignupSchema]?.message
                : undefined
            }
            register={register}
            disabled={isAlwaysDisabled || !editable}
            isMyPage
            editable={editable}
            isAlwaysDisabled={isAlwaysDisabled}
          />
        );
      })}
    </FormContainer>
  );
};

export default MyPageForm;
