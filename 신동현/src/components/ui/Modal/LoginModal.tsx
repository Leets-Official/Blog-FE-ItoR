import { Clear, GITLOG, Kakao } from "@/assets";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Input from "../Input";
import SignButton from "../Button/SignButton";
import { loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EamilLogin, KakaoLogin } from "@/api/login/login";
import Toast from "../Toast";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { EmailLoginData } from "@/type/User/Login";

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

const Container = styled.div`
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

const SubmitContainer = styled.div`
  width: 391px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (max-width: 700px) {
    width: 70%;
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
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

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
  width: 100%;
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

  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const { control, handleSubmit } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailLoginMutation = useMutation({
    mutationFn: (data: EmailLoginData) => EamilLogin(data.email, data.password),
    onSuccess: (data) => {
      const stateCode = data.code;
      if (stateCode !== 200 || data.error) {
        setToast({ message: data.message, type: "error" });
        return;
      }

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("nickName", data.data.nickname);
      localStorage.setItem("profilePicture", data.data.profilePicture);
      localStorage.setItem("bio", data.data.introduction);
      localStorage.setItem("isKakaoLogin", "false");

      setToast({ message: "로그인에 성공했습니다.", type: "success" });
      setTimeout(() => {
        onClose();
        navigate("/", { replace: true });
        window.location.reload();
      }, 3000);
    },
    onError: (error) => {
      setToast({ message: "로그인에 실패했습니다.", type: "error" });
      console.log(error);
    }
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    emailLoginMutation.mutate({ email: data.email, password: data.password });
  }

  const onKakaoLogin = async () => {
    await KakaoLogin();
  }

  return (
    <Overlay onClick={onClose}>
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <Container onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <Clear width="30px" height="30px" fill="white" />
        </CloseButton>
        <ImageContainer>
          <GITLOG fill="white" />
          <ImageSubContent>
            You can make anything by writing
          </ImageSubContent>
        </ImageContainer>
        <SubmitContainer>
          <InputContainer>
            <Input width="100%" height="46px" type="text" placeholder="이메일" onChange={() => { }} control={control} name="email" />
            <Input width="100%" height="46px" type="password" placeholder="비밀번호" onChange={() => { }} control={control} name="password" />
          </InputContainer>
          <ButtonContainer>
            <SignButton width="100%" disabled={false} onClick={handleSubmit(onSubmit)} type="email">이메일로 로그인</SignButton>
            <SnsContent>SNS</SnsContent>
            <SignButton width="100%" disabled={false} onClick={onKakaoLogin} icon={<Kakao />} type="kakao">카카오로 로그인</SignButton>
            <InputContent>
              <Link to="/signUp" onClick={onClose} style={{ textDecoration: "none", color: "#909090" }}>또는 회원가입</Link>
            </InputContent>
          </ButtonContainer>
        </SubmitContainer>
      </Container>
    </Overlay>
  );
};

export default Login;