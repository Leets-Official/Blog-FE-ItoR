import styled, { keyframes } from "styled-components";
import Button from "./Button";

interface ModalProps {
  children ?: React.ReactNode;
  title ?: string;
  subTitle ?: string;
  open: boolean;
  onClose: () => void;
  buttonComponents?: {
    text: string;
    onClick: () => void;
    type: 'primary' | 'secondary';
  }[];
  width?: string;
  height?: string;
  animation?: 'fadeIn' | 'slideIn';
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Container = styled.div<{ width?: string; height?: string; animation?: string }>`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  animation: ${(props) => props.animation === 'fadeIn' ? fadeIn : slideIn} 0.3s ease-in-out;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 4px;
`;

const ModalSubTitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
`;


const Modal = ({ title, subTitle, open, onClose, width, height, animation, buttonComponents }: ModalProps) => { 
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()} width={width} height={height} animation={animation}>
        {title && <ModalTitle>{title}</ModalTitle>}
        {subTitle && <ModalSubTitle>{subTitle}</ModalSubTitle>}
        <ButtonContainer>
          {buttonComponents?.map((button, index) => (
            <Button key={index} fontSize="15px" width="100%" height="50px" backgroundcolor={button.type === 'primary' ? "#2196F3" : "#ffffff"} color={button.type === 'primary' ? "#ffffff" : "#2196F3"} style={{ border: button.type === 'primary' ? "none" : "1px solid #2196F3"}} onClick={button.onClick}>{button.text}</Button>
          ))}
        </ButtonContainer>
      </Container>
    </Overlay>
  );
};

export default Modal;