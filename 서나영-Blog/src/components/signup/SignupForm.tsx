import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupSchema } from '@/schema/auth';
import { Kakao } from '@/assets';
import { signupAPI } from '@/api/auth/signupAPI';
import styled from 'styled-components';
import ProfileUpload from './ProfileUpload';
import SignupInput from './SignupInput';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import LoginModal from '@/components/modal/LoginModal';

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

const SignupForm = () => {
  const location = useLocation();

  const isKakaoLogin = location.state?.isKakaoLogin ?? false;
  const kakaoName = location.state?.name || '';
  const kakaoProfilePicture = location.state?.profilePicture || '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isKakaoLogin) {
      reset({
        email: '',
        name: kakaoName,
        profilePicture: kakaoProfilePicture,
        birthDate: '',
        nickname: '',
        bio: '',
      });
    }
  }, [isKakaoLogin, kakaoName, kakaoProfilePicture, reset]);

  const onSubmit = async (data: SignupSchema) => {
    console.log('회원가입 제출 데이터:', data);

    try {
      const response = await signupAPI({
        ...data,
        nickname: data.nickname?.trim() || data.name,
        bio: data.bio ?? '',
        profilePicture: watch('profilePicture') || '',
        isKakaoLogin,
      });

      console.log('회원가입 성공 응답:', response);
      setIsModalOpen(true);
    } catch (error: any) {
      if (error.message === '이미 가입된 이메일입니다.') {
        setErrorModal({
          isOpen: true,
          message: error.message,
        });
      } else {
        alert(error.message);
      }
    }
  };

  const inputFields = [
    ...(isKakaoLogin
      ? [
          {
            name: 'email',
            label: '이메일',
            type: 'email',
            placeholder: '이메일',
          },
          {
            name: 'name',
            label: '이름',
            type: 'text',
            placeholder: '이름',
          },
        ]
      : [
          {
            name: 'email',
            label: '이메일',
            type: 'email',
            placeholder: '이메일',
          },
          {
            name: 'password',
            label: '비밀번호',
            type: 'password',
            placeholder: '비밀번호',
          },
          {
            name: 'confirmPassword',
            label: '비밀번호 확인',
            type: 'password',
            placeholder: '비밀번호 확인',
          },
          {
            name: 'name',
            label: '이름',
            type: 'text',
            placeholder: '이름',
          },
        ]),
    {
      name: 'birthDate',
      label: '생년월일',
      type: 'date',
      placeholder: 'YYYY-MM-DD',
    },
    {
      name: 'nickname',
      label: '닉네임',
      type: 'text',
      placeholder: '닉네임',
    },
    {
      name: 'bio',
      label: '한 줄 소개',
      type: 'text',
      placeholder: '한 줄 소개',
    },
  ];

  return (
    <FormContainer>
      <ProfileUpload
        initialImage={kakaoProfilePicture}
        onImageChange={(imageUrl) => {
          reset({ ...watch(), profilePicture: imageUrl });
        }}
      />
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {isKakaoLogin && (
          <>
            <SocialLabel>소셜 로그인</SocialLabel>
            <SocialBox>
              <Kakao width={18} height={18} />
              카카오 로그인
            </SocialBox>
          </>
        )}

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

      <Modal
        title='회원가입이 완료되었습니다!'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        RightButtonText='로그인하기'
        RightButtonColor='#00A1FF'
        LeftButtonText='확인'
      />

      <Modal
        title={errorModal.message}
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
        onConfirm={() => {
          setErrorModal({ isOpen: false, message: '' });
          setIsLoginModalOpen(true);
        }}
        RightButtonText='로그인하기'
        RightButtonColor='#00A1FF'
        LeftButtonText='확인'
      />

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </FormContainer>
  );
};

export default SignupForm;
