import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';

type TextType = 'Delete' | 'Create';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Text = styled.p<{ type: TextType }>`
  font-size: 14px;
  letter-spacing: -0.07px;
  padding: 8px 12px;
  color: ${({ type }) => (type === 'Delete' ? '#FF3F3F' : '#000')};
`;

interface Props {
  title: string;
  content: string;
}

const DelandCreate = ({ title, content }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setModalOpen(false);
    console.log('게시글 삭제됨');
    showToast('삭제가 완료되었습니다!', 'positive');
    navigate('/');
  };

  const handleCreateClick = () => {
    if (!title.trim() || !content.trim()) {
      showToast('내용을 입력해주세요', 'negative');
    } else {
      showToast('저장되었습니다!', 'positive');
      navigate('/');
    }
  };

  return (
    <>
      <Container>
        <Text type='Delete' onClick={handleDeleteClick}>
          삭제하기
        </Text>
        <Text type='Create' onClick={handleCreateClick}>
          게시하기
        </Text>
      </Container>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title='작성하던 블로그를 삭제하시겠어요?'
        description='삭제된 블로그는 다시 확인할 수 없어요.'
        LeftButtonText='취소'
        RightButtonText='삭제하기'
        RightButtonColor='#FF5A5A'
      />
    </>
  );
};

export default DelandCreate;
