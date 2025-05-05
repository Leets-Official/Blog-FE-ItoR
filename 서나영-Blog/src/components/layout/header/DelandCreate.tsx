import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import { createPost, updatePost } from '@/api/blog/postDetailAPI';
import { Block } from '@/types/blogPost';

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
  blocks: Block[];
  postId?: string;
}

const DelandCreate = ({ title, content, blocks, postId }: Props) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setModalOpen(false);
    console.log('게시글 삭제됨');
    showToast('삭제가 완료되었습니다!', 'positive');
    navigate('/');
  };

  const handleCreateClick = async () => {
    const hasValidContent = blocks.some(
      (block) => block.type === 'IMAGE' || block.content.trim() !== '',
    );

    if (!title.trim() || !hasValidContent) {
      showToast('내용을 입력해주세요', 'negative');
      return;
    }

    try {
      const postContents = blocks.map((block, index) => ({
        contentOrder: index + 1,
        content: block.content,
        contentType: block.type,
      }));

      if (postId) {
        await updatePost(postId, { title, contents: postContents });
        showToast('수정되었습니다!', 'positive');
        navigate(`/blog/${postId}`);
      } else {
        await createPost(title, postContents);
        showToast('저장되었습니다!', 'positive');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      showToast('게시 실패. 다시 시도해주세요.', 'negative');
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
