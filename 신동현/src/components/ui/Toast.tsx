import styled, { keyframes } from "styled-components";
import { Done, Error } from "@/assets";
import { useEffect, useState } from "react";

const slideIn = keyframes`
  from { 
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to { 
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from { 
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to { 
    transform: translate(-50%, -100%);
    opacity: 0;
  }
`;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ $isVisible }) => $isVisible ? slideIn : slideOut} 0.3s ease-in-out;
`;

const ToastContainer = styled.div<{ type: "success" | "error" }>`
  background-color: #FFFFFF;
  color: ${({ type }) => type === "success" ? "#15DC5E" : "#FF3F3F"};
  padding: 12px 24px;
  border-radius: 25px;
  border: 1px solid ${({ type }) => type === "success" ? "#15DC5E" : "#FF3F3F"};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ToastText = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  height: 25px;
`;

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast = ({ message, type }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isRender, setIsRender] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    setIsRender(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsRender(false);
      }, 300);
    }, 2700);

    return () => clearTimeout(timer);
  }, [message, type]);

  if (!isRender) return null;

  return (
    <Wrapper $isVisible={isVisible}>
      <ToastContainer type={type}>
          {type === "error" && <Error width={25} height={25} fill="#FF3F3F" style={{ transform: "translateY(1px)" }} />}
          {type === "success" && <Done width={25} height={25} fill={"#15DC5E"} style={{ transform: "translateY(1px)" }} />}
        <ToastText>{message}</ToastText>
      </ToastContainer>
    </Wrapper>
  )
}

export default Toast;  
