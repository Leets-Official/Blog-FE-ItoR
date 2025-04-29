import styled from 'styled-components';
import { flexAlignCenter, flexColumn, flexColumnCenter } from '@/styles/common.styled';
import { Button, Image, Input } from '@/components';
import { emailSignupFields, kakaoSignupFields } from '@/constants';
import { PhotoSvg, DefaultProfileSvg, KakaoSvg } from '@/assets';
import theme from '@/styles/theme.styled';
import { Text } from '@/components/home/PostItem';
import { useRef } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useForm, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema, signupSchema } from '@/schema/auth';
import { getFileUrl, getPresignedUrl } from '@/api/file/file';
import { kakaoSignupApi } from '@/api/auth/auth';

interface SignupFieldProps {
  signupType: 'email' | 'kakao';
}

export const Wrapper = styled.div`
  ${flexColumnCenter}
  width: 100%;
  max-width: 720px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 10px 20px;
`;

export const InputSection = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const ButtonWrapper = styled.div`
  ${flexAlignCenter}
  gap:8px;
`;

export const ProfileSection = styled.div`
  ${flexColumn}
  gap:16px;
  width: 100%;
  margin-bottom: 20px;
`;

const SignupField: React.FC<SignupFieldProps> = ({ signupType }) => {
  const readOnlyFields = ['socialLogin', 'name'];
  const isKakao = signupType === 'kakao';
  const fields = isKakao ? kakaoSignupFields : emailSignupFields;
  const inputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, handleImageChange, imageFile } = useImageUpload();

  const handleClick = () => inputRef.current?.click();

  const kakaoUserName = isKakao ? (localStorage.getItem('nickname') ?? '') : '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: kakaoUserName,
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    console.log('Form Data:', data);
    try {
      let profilePicture = '';

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const presignedUrl = await getFileUrl(fileName); // presignedUrl 요청
        await getPresignedUrl(imageFile, presignedUrl); // s3에 업로드
        profilePicture = presignedUrl.split('?')[0]; // presignedUrl에서 ? 이전 부분만 저장
      }

      const signupData = {
        ...data,
        profilePicture,
      };

      await kakaoSignupApi(signupData);

      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error('회원가입 중 오류 발생', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <Wrapper>
      <InputSection>
        <ProfileSection>
          <Text fontSize="sm" fontWeight="light" color="gray56">
            프로필 사진
          </Text>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="profile-preview"
              width="90px"
              height="90px"
              borderRadius="50%"
            />
          ) : (
            <DefaultProfileSvg width="90px" height="90px" />
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          <ButtonWrapper onClick={handleClick}>
            <Button
              variant="text"
              size="md"
              rounded="sm"
              height="25px"
              borderColor={theme.COLORS.gray[90]}
              textColor={theme.COLORS.gray[56]}
            >
              <PhotoSvg />
              프로필 사진 추가
            </Button>
          </ButtonWrapper>
        </ProfileSection>

        {fields.map(({ label, placeholder, name, type }) => (
          <InputWrapper key={name}>
            <Input
              {...register(name as Path<SignupSchema>)}
              label={label}
              placeholder={placeholder}
              type={type}
              readOnly={isKakao && readOnlyFields.includes(name)}
              icon={name === 'socialLogin' ? <KakaoSvg /> : undefined}
              errorMessage={errors[name as keyof SignupSchema]?.message}
            />
          </InputWrapper>
        ))}
      </InputSection>

      <Button
        variant="primary-outline"
        size="lg"
        rounded="full"
        fullWidth
        onClick={handleSubmit(onSubmit)}
        type="submit"
      >
        회원가입 완료
      </Button>
    </Wrapper>
  );
};

export default SignupField;
