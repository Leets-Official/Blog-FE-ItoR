import { Header } from '@/components';
import ContentSection from '@/components/blog/ContentSection';
import PhotoSection from '@/components/blog/PhotoSection';
import TitleSection from '@/components/blog/TitleSection';
import { flexColumnCenter } from '@/styles/common.styled';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
  ${flexColumnCenter}
  gap:40px;
  width: 100%;
  max-width: 720px;
  padding: 0 20px;
  margin: 72px auto 0 auto;
`;

const Container = styled.div`
  ${flexColumnCenter}
`;

const Post: React.FC = () => {
  return (
    <Container>
      <Header variant="action" confirmLabel="게시하기" negativeLabel="삭제하기" />
      <ContentWrapper>
        <PhotoSection />
        <TitleSection />
        <ContentSection />
      </ContentWrapper>
    </Container>
  );
};

export default Post;
