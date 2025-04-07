import styled from 'styled-components';
import { BlogPostContent } from '@/types/blogPost';
import Image from '@/components/ui/Image';

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 688px;
  padding: 32px 16px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const TextBlock = styled.p`
  font-family: 'Noto Sans L';
  font-size: 14px;
  line-height: 160%;
  letter-spacing: -0.07px;
  font-weight: 300;
  color: #333;
  white-space: pre-line;
`;

interface BlogContentProps {
  contents: BlogPostContent[];
}

const BlogContent: React.FC<BlogContentProps> = ({ contents }) => {
  return (
    <ContentWrapper>
      {contents.map((block, index) => {
        if (block.contentType === 'TEXT') {
          return <TextBlock key={index}>{block.content}</TextBlock>;
        }

        if (block.contentType === 'IMAGE') {
          return (
            <Image
              key={index}
              src={block.content}
              alt={`본문 이미지 ${index + 1}`}
              borderRadius='8px'
              width='100%'
              aspectRatio='16/9'
            />
          );
        }

        return null;
      })}
    </ContentWrapper>
  );
};

export default BlogContent;
