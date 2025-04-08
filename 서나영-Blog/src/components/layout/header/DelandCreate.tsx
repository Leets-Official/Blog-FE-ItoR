import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToast } from '@/components/ui/Toast';

type TextType = 'Delete' | 'Create';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Text = styled.p<{ type: TextType }>`
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.07px;
  padding: 8px 12px;
  color: ${({ type }) => (type === 'Delete' ? '#FF3F3F' : '#000')};
`;

interface Props {
  title: string;
  content: string;
}

const DelandCreate = ({ title, content }: Props) => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    navigate('/');
  };

  const handleCreateClick = () => {
    if (!title.trim() || !content.trim()) {
      showToast('내용을 입력해주세요', 'negative');
    } else {
      showToast('저장되었습니다!', 'positive');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <Container>
      <Text type='Delete' onClick={handleDeleteClick}>
        삭제하기
      </Text>
      <Text type='Create' onClick={handleCreateClick}>
        게시하기
      </Text>
    </Container>
  );
};

export default DelandCreate;
