import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat, MoreVert } from '@/assets';
import styled from 'styled-components';
import Modal from '@/components/ui/Modal';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/ui/Dropdown';
import { useToast } from '@/components/ui/Toast';

interface ChatandMoreProps {
  commentRef?: React.RefObject<HTMLDivElement | null>;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const IconWrapper = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ChatandMore = ({ commentRef }: ChatandMoreProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleDropdownSelect = (item: string) => {
    if (item === '삭제하기') {
      setModalOpen(true);
    }
    closeDropdown();
  };

  const handleConfirmDelete = () => {
    setModalOpen(false);
    console.log('블로그 삭제됨');
    showToast('삭제가 완료되었습니다!', 'positive');
    navigate('/');
  };

  const scrollToComments = () => {
    commentRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Container>
        <IconWrapper onClick={scrollToComments}>
          <Chat width={24} height={24} />
        </IconWrapper>
        <IconWrapper onClick={toggleDropdown}>
          <MoreVert width={24} height={24} />
        </IconWrapper>
      </Container>
      {isOpen && (
        <Dropdown
          isOpen={isOpen}
          menuItems={['수정하기', '삭제하기']}
          onSelect={handleDropdownSelect}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title='해당 블로그를 삭제하시겠어요?'
        description='삭제된 블로그는 다시 확인할 수 없어요.'
        LeftButtonText='취소'
        RightButtonText='삭제하기'
        RightButtonColor='#FF5A5A'
      />
    </>
  );
};

export default ChatandMore;
