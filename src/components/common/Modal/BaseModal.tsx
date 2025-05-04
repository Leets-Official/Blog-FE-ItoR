import Modal from 'react-modal';
import { StyledModal } from './Modal.styled';

interface BaseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onRequestClose, children, maxWidth }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={StyledModal(maxWidth ?? '780px')}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
