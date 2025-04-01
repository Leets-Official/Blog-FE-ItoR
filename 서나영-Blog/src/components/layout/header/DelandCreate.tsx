import styled from 'styled-components';

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
const DelandCreate = () => {
  return (
    <Container>
      <Text type='Delete'>삭제하기</Text>
      <Text type='Create'>게시하기</Text>
    </Container>
  );
};

export default DelandCreate;
