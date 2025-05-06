import { postApi } from '@/api/post/post.api';
import { Header, Toast } from '@/components';
import ContentSection from '@/components/blog/ContentSection';
import useToastMessage from '@/hooks/useToastMessage';
import { flexColumnCenter } from '@/styles/common.styled';
import { ContentBlock } from '@/types/post';
import { useState } from 'react';
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
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    { id: Date.now(), type: 'text', value: '' },
  ]);

  const { toastMessage, toastType, showToast, showToastMessage } = useToastMessage();

  const handlePost = async () => {
    const hasContent = contentBlocks.some(
      (block) => (block.type === 'text' && block.value.trim()) || block.url,
    );

    if (!title.trim()) {
      showToastMessage('제목을 입력해주세요.');
      return;
    }

    if (!hasContent) {
      showToastMessage('내용을 입력해주세요.');
      return;
    }

    const contents = contentBlocks
      .filter((block) => block.value.trim() || block.url)
      .map((block, index) => ({
        contentOrder: index + 1,
        content: block.type === 'text' ? block.value : block.url || '',
        contentType: block.type === 'text' ? 'TEXT' : 'IMAGE',
      }));

    try {
      console.log('[게시물 작성 데이터]', {
        title,
        contentBlocks,
      });

      await postApi(title, contentBlocks);
      alert('게시물 작성 완료!');
    } catch (err) {
      console.error(err);
      alert('게시물 작성 실패');
    }
  };

  return (
    <Container>
      <Header
        variant="action"
        confirmLabel="게시하기"
        negativeLabel="삭제하기"
        onClickConfirm={handlePost}
      />
      <ContentWrapper>
        <ContentSection
          title={title}
          setTitle={setTitle}
          contentBlocks={contentBlocks}
          setContentBlocks={setContentBlocks}
        />
      </ContentWrapper>
      {showToast && <Toast message={toastMessage} type={toastType} />}
    </Container>
  );
};

export default Post;
