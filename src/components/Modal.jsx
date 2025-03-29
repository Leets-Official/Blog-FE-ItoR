import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  width: 320px;
  min-height: 140px;
`;

const ModalText = styled.div`
  margin: -10px 0px 30px 10px;

  h4 {
    font-size: 16px;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    color: #7c7878;
    line-height: 1.3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>{children}</ModalContent>
    </ModalOverlay>
  );
};

export { Modal, ModalText, ButtonContainer };
