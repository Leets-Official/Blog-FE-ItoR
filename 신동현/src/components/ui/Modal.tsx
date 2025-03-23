import styled, { keyframes } from "styled-components";

interface ModalProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
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
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    animation: ${(props) => props.animation === 'fadeIn' ? fadeIn : slideIn} 0.3s ease-in-out;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0.5rem;
    
    &:hover {
        color: #333;
    }
`;

const Modal = ({ children, open, onClose, width, height, animation }: ModalProps) => {
    if (!open) return null;

    return (
        <Overlay onClick={onClose}>
            <Container onClick={(e) => e.stopPropagation()} width={width} height={height} animation={animation}>
                {children}
                <CloseButton onClick={onClose}>✕</CloseButton>
            </Container>
        </Overlay>
    );
};



export default Modal;