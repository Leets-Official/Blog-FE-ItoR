import React, { createContext, useContext, useState, ReactNode } from 'react';
import Button from './Button';
import styled, { keyframes, css } from 'styled-components';

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  width?: string;
  height?: string;
  icon?: ReactNode;
  closeButton?: ReactNode;
}

// Fade In/Out 애니메이션
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const ModalTitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.07px;
`;

const ModalDescription = styled.p`
  font-size: 12px;
  color: #909090;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

const ModalContent = styled.div`
  display: flex;
  padding: 0px 4px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 12px;
  gap: 8px;
`;

const ModalContainer = styled.div<{ width?: string; height?: string | undefined; isOpen: boolean }>`
  display: flex;
  width: ${({ width }) => width || '326px'};
  height: ${({ height }) => (height ? height : 'auto')};
  padding: 24px 16px 16px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 4px;
  background: var(--White, #fff);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);

  ${({ isOpen }) =>
    isOpen
      ? css`
          animation: ${fadeIn} 0.3s ease-out forwards;
        `
      : css`
          animation: ${fadeOut} 0.3s ease-in forwards;
          opacity: 0;
          pointer-events: none;
        `}
`;

// 오버레이 배경 스타일
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(182, 182, 182, 0.5);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  gap: 12px;
`;

const Modal = ({ title, description, isOpen, onClose, onConfirm, width, height }: ModalProps) => {
  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        isOpen={isOpen}
        width={width}
        height={height}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalContent>
        <ButtonGroup>
          <Button
            onClick={onClose}
            style={{
              flex: 1,
              borderRadius: '2px',
              backgroundColor: '#FFF',
              border: '1px solid #F5F5F5',
            }}
          >
            취소
          </Button>
          <Button
            onClick={onConfirm}
            style={{ flex: 1, backgroundColor: '#FF3F3F', color: '#FFFFFF' }}
          >
            삭제하기
          </Button>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
