import styled from 'styled-components';
import { flexAlignCenter, flexColumn, flexColumnCenter } from '@/styles/common.styled';
import { KakaoSvg } from '@/assets';
import { Button, Input } from '@/components';
import { emailSignupFields, kakaoSignupFields } from '@/constants';
import { PhotoSvg, DefaultProfileSvg } from '@/assets';
import theme from '@/styles/theme.styled';
import { Text } from '../home/PostItem';

interface SignupFieldProps {
  signupType: 'email' | 'kakao';
}

const Wrapper = styled.div`
  ${flexColumnCenter}
  width: 100%;
  max-width: 720px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 10px 20px;
`;

const InputSection = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

const ButtonSection = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  ${flexAlignCenter}
  gap:8px;
`;

const ProfileSection = styled.div`
  ${flexColumn}
  gap:16px;
  width: 100%;
  margin-bottom: 20px;
`;

const SignupField: React.FC<SignupFieldProps> = ({ signupType }) => {
  const readOnlyFields = ['socialLogin', 'email', 'name'];
  const isKakao = signupType === 'kakao';
  const fields = isKakao ? kakaoSignupFields : emailSignupFields;

  return (
    <Wrapper>
      <InputSection>
        <ProfileSection>
          <Text fontSize="sm" fontWeight="light" color="gray56">
            프로필 사진
          </Text>
          <DefaultProfileSvg />
          <ButtonWrapper>
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
              label={label}
              placeholder={placeholder}
              type={type}
              readOnly={isKakao && readOnlyFields.includes(name)}
              icon={name === 'socialLogin' ? <KakaoSvg /> : undefined}
            />
          </InputWrapper>
        ))}
      </InputSection>

      <ButtonSection>
        <Button variant="primary-outline" size="lg" rounded="full" fullWidth>
          회원가입 완료
        </Button>
      </ButtonSection>
    </Wrapper>
  );
};

export default SignupField;
