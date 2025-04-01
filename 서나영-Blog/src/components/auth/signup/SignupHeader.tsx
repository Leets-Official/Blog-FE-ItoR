import styled from 'styled-components';

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  margin-top: 64px;
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 688px;
  padding: 12px 16px;
  flex-direction: column;
  align-items: flex-start;
`;

const SignupHeader = () => {
  return (
    <Header>
      <TextContainer>
        <p style={{ fontSize: '24px', fontWeight: '500', color: '#000' }}>회원가입</p>
        <p
          style={{
            fontSize: '14px',
            fontWeight: '300',
            letterSpacing: '-0.07px',
            color: '#000',
          }}
        >
          가입을 위해 회원님의 정보를 입력해주세요.
        </p>
      </TextContainer>
    </Header>
  );
};

export default SignupHeader;
