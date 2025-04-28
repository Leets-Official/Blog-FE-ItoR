import { useModal } from '@/context/ModalContext';
import { LoginModal, ActionModal, DetailModal } from '@/components';

const ModalLayer: React.FC = () => {
  const { modalType, closeModal, isOpen } = useModal();

  if (!isOpen) return null;

  if (modalType === 'login') {
    return <LoginModal />;
  }

  if (modalType === 'logout') {
    return (
      <ActionModal
        isOpen
        onClose={closeModal}
        message="로그아웃을 진행할게요"
        actionText="로그아웃"
        cancelText="취소"
        type="positive"
        onConfirm={() => {
          localStorage.removeItem('accessToken');
          closeModal();
          window.location.reload();
        }}
      />
    );
  }

  if (modalType === 'delete') {
    return (
      <ActionModal
        isOpen
        onClose={closeModal}
        message="해당 블로그를 삭제하시겠어요?"
        subMessage="삭제된 블로그는 다시 확인할 수 없어요."
        actionText="삭제하기"
        cancelText="취소"
        type="negative"
      />
    );
  }

  return null;
};

export default ModalLayer;
