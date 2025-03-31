import { ClearWhite, GITLOG_White, Kakao } from "@/assets";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Input from "./Input";
import SignButton from "./Button/SignButton";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div<{ animation?: string }>`
  width: 782px;
  height: 469px;
  background-color: #111112;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (max-width: 700px) {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
  }  
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    flex-basis: 500px; 
  }
`;

const ImageSubContent = styled.p`
  font-size: 14px;
  color: #333333;
  padding-top: 20px;

  @media (max-width: 700px) {
    font-size: 12px;

  }
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (max-width: 700px) {
    justify-content: start;
  }
`;

const InputContent = styled.p`
  width: 300px;
  height: 8px;
  font-size: 12px;
  color: #909090;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`;

const SnsContent = styled(InputContent)`
  &::before,
  &::after {
    content: "";
    display: block;
    flex: 1;
    height: 1px;
    background-color: #333333;
  }
`;

interface LoginProps {
  open: boolean;
  onClose: () => void;
}

const Login = ({ open, onClose }: LoginProps) => {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <ClearWhite />
        </CloseButton>
        <ImageContainer>
          <GITLOG_White />
          <ImageSubContent>
            You can make anything by writing
          </ImageSubContent>
        </ImageContainer>
        <InputContainer>
          <Input width="265px" height="46px" type="text" placeholder="이메일" value="" onChange={() => { }} />
          <Input width="265px" height="46px" type="password" placeholder="비밀번호" value="" onChange={() => { }} />
          <SignButton disabled={false} onClick={() => { }} type="email">이메일로 로그인</SignButton>
          <SignButton disabled={false} onClick={() => { }} icon={<Kakao />} type="kakao">카카오로 로그인</SignButton>
          <InputContent>
            <Link to="/signUp" style={{ textDecoration: "none", color: "#909090" }}>또는 회원가입</Link>
          </InputContent>

        </InputContainer>
      </Container>
    </Overlay>
  );
};

export default Login;