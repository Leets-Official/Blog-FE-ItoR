import React from 'react';
import styled from 'styled-components';
import Button from './Button';

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
  padding: 30px;
  border-radius: 10px;
  min-width: 300px;
`;

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {' '}
        {/*ModalContent 클릭했을때 나가짐 방지*/}
        <h2>모달 내용</h2>
        <p>닫기 버튼을 눌러주세요.</p>
        <Button onClick={onClose}>닫기</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
