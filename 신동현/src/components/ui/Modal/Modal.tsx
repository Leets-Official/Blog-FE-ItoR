import styled, { keyframes } from "styled-components";
import Button from "../Button/Button";

interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  open: boolean;
  onClose: () => void;
  animation?: 'fadeIn' | 'slideIn';
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  cancelType?: 'positive' | 'negative' | 'default';
  confirmType?: 'positive' | 'negative' | 'default';
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

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

const Container = styled.div<{ animation?: string }>`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: auto;
  width: auto;
  height: auto;
  min-width: 340px;
  max-width: 95vw;
  animation: ${(props) => props.animation === 'fadeIn' ? fadeIn : slideIn} 0.3s ease-in-out;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  margin-top: 32px;
`;

const ModalTitle = styled.h2`
  font-size: 14px;
  margin: 0;
  margin-bottom: 4px;
`;

const ModalSubTitle = styled.p`
  font-size: 14px;
  color: #666;
`;

const Modal = ({ title, subTitle, open, onClose, onCancel, onConfirm, animation, cancelText, confirmText, cancelType, confirmType }: ModalProps) => {
  if (!open) return null;

  const typeStyleMap = {
    positive: {
      backgroundColor: "#2196F3",
      color: "#ffffff",
      border: "none"
    },
    negative: {
      backgroundColor: "#FF3F3F",
      color: "#ffffff",
      border: "none"
    },
    default: {
      backgroundColor: "#ffffff",
      color: "#000000",
      border: "1px solid #F5F5F5"
    },
    fallback: {
      backgroundColor: "#ffffff",
      color: "#000000",
      border: "1px solid #F5F5F5"
    }
  }

  const cancelStyle = typeStyleMap[cancelType || "fallback"];
  const confirmStyle = typeStyleMap[confirmType || "fallback"];

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()} animation={animation}>
        {title && <ModalTitle>{title}</ModalTitle>}
        {subTitle && <ModalSubTitle>{subTitle}</ModalSubTitle>}
        <ButtonContainer>
          <Button fontSize="15px" width="100%" height="50px" backgroundColor={cancelStyle.backgroundColor} color={cancelStyle.color} style={{ border: cancelStyle.border, borderRadius: "2px" }} onClick={onCancel || (() => { })}>{cancelText}</Button>
          <Button fontSize="15px" width="100%" height="50px" backgroundColor={confirmStyle.backgroundColor} color={confirmStyle.color} style={{ border: confirmStyle.border, borderRadius: "2px" }} onClick={onConfirm || (() => { })}>{confirmText}</Button>
        </ButtonContainer>
      </Container>
    </Overlay>
  );
};

export default Modal;