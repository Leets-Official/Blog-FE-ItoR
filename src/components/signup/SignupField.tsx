import { flexColumnCenter } from '@/styles/common.styled';
import { KakaoSvg } from '@/assets';
import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import { inputFields } from '@/constants';
import Button from '@/components/common/Button/Button';

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

const SignupField: React.FC<SignupFieldProps> = ({ signupType }) => {
  const isKakao = signupType === 'kakao';

  return (
    <Wrapper>
      <InputSection>
        {inputFields.map(({ label, placeholder, name, type }) => {
          if (isKakao && (name === 'password' || name === 'confirmPassword')) {
            return null;
          }

          if (isKakao && name === 'email') {
            return (
              <InputWrapper key="social-login">
                <Input
                  label="소셜 로그인"
                  placeholder="카카오 로그인"
                  readOnly
                  icon={<KakaoSvg />}
                />
              </InputWrapper>
            );
          }

          return (
            <InputWrapper key={name}>
              <Input
                label={label}
                placeholder={placeholder}
                type={type}
                readOnly={isKakao && name === 'name'}
              />
            </InputWrapper>
          );
        })}
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
