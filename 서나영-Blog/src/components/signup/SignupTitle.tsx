import styled from 'styled-components';

interface SignupTitleProps {
  hideDescription?: boolean;
}

const SignupTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  margin-top: 64px;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 688px;
  padding: 12px 16px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 32px;
  margin-bottom: 20px;
`;

const SignupTitle = ({ hideDescription = false }: SignupTitleProps) => {
  return (
    <SignupTitleWrapper>
      <TextWrapper>
        <p style={{ fontSize: '24px', fontWeight: '500', color: '#000' }}>회원가입</p>
        {!hideDescription && (
          <p
            style={{
              fontSize: '14px',
              fontWeight: '300',
              letterSpacing: '-0.07px',
              color: '#000',
              fontFamily: 'Noto Sans L',
            }}
          >
            가입을 위해 회원님의 정보를 입력해주세요.
          </p>
        )}
      </TextWrapper>
    </SignupTitleWrapper>
  );
};

export default SignupTitle;
