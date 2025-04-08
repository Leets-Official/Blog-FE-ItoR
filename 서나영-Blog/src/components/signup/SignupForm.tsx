import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupSchema } from '@/schema/auth';
import styled from 'styled-components';
import ProfileUpload from './ProfileUpload';
import SignupInput from './SignupInput';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

const FormContainer = styled.div`
  width: 100%;
  max-width: 688px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 12px 16px;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  margin-bottom: 64px;
`;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data: SignupSchema) => {
    console.log('회원가입 데이터', data);
    setIsModalOpen(true);
  };

  const inputFields = [
    { name: 'email', label: '이메일', type: 'email', placeholder: '이메일' },
    { name: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호' },
    {
      name: 'confirmPassword',
      label: '비밀번호 확인',
      type: 'password',
      placeholder: '비밀번호 확인',
    },
    { name: 'name', label: '이름', type: 'text', placeholder: '이름' },
    { name: 'birthDate', label: '생년월일', type: 'date', placeholder: 'YYYY-MM-DD' },
    { name: 'nickname', label: '닉네임', type: 'text', placeholder: '닉네임' },
    { name: 'bio', label: '한 줄 소개', type: 'text', placeholder: '한 줄 소개' },
  ];
  console.log('폼 에러 상태:', errors);

  return (
    <FormContainer>
      <ProfileUpload />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {inputFields.map((field) => (
          <SignupInput
            key={field.name}
            {...register(field.name as keyof SignupSchema)}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.name as keyof SignupSchema]?.message}
            register={register}
          />
        ))}

        <ButtonWrapper>
          <Button
            type='Submit'
            buttonType='submit'
            width='100%'
            style={{
              color: '#00A1FF',
              borderRadius: '25px',
              backgroundColor: '#FFF',
              border: '1px solid #00A1FF',
              fontFamily: 'Noto Sans R',
            }}
          >
            회원가입 완료
          </Button>
        </ButtonWrapper>
      </form>

      {/* 회원가입 완료 모달 */}
      <Modal
        title='회원가입이 완료되었습니다!'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        RightButtonText='로그인하기'
        RightButtonColor='#00A1FF'
        LeftButtonText='확인'
      />
    </FormContainer>
  );
};

export default SignupForm;
