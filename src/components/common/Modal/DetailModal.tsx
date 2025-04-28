import { useModal } from '@/context/ModalContext';
import { flexColumn } from '@/styles/common.styled';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface DetailModalProps {
  onClose: () => void;
  onAction: (action: 'edit' | 'delete') => void;
}
export const ModalWrapper = styled.div`
  ${flexColumn}
  width:160px;
  position: absolute;
  top: 70px;
  right: 20px;
  background-color: ${({ theme }) => theme.COLORS.white};
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: visible;
  border-radius: 4px;

  &::before {
    content: '';
    position: absolute;
    top: -7px;
    right: 12px;
    width: 15px;
    height: 15px;
    transform: rotate(45deg);
    box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.05);
    z-index: 1;
    background-color: ${({ theme }) => theme.COLORS.white};
  }
`;

export const MenuItems = styled.div<{ isNegative?: boolean }>`
  padding: 18px 16px;
  text-align: left;
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme, isNegative }) => (isNegative ? theme.COLORS.negative : theme.COLORS.black)};
`;

const DetailModal: React.FC<DetailModalProps> = ({ onClose, onAction }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    onClose();
    openModal('delete');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <ModalWrapper ref={modalRef}>
      <MenuItems onClick={() => onAction('edit')}>수정하기</MenuItems>
      <MenuItems isNegative onClick={handleDeleteClick}>
        삭제하기
      </MenuItems>
    </ModalWrapper>
  );
};

export default DetailModal;
