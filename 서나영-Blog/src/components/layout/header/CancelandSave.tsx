import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';

type TextType = 'Cancel' | 'Save';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Text = styled.p<{ type: TextType }>`
  font-size: 14px;
  letter-spacing: -0.07px;
  padding: 8px 12px;
  color: ${({ type }) => (type === 'Cancel' ? '#FF3F3F' : '#000')};
  cursor: pointer;
`;

const CancelandSave = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    showToast('저장되었습니다!', 'positive');
    navigate('/mypage');
  };

  return (
    <Container>
      <Text type='Cancel' onClick={handleCancel}>
        취소하기
      </Text>
      <Text type='Save' onClick={handleSave}>
        저장하기
      </Text>
    </Container>
  );
};

export default CancelandSave;
