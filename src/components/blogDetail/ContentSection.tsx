import { ContentWrapper } from '@/pages/post';
import styled from 'styled-components';
import { Image } from '@/components';
import { PostContent } from '@/types/post';

const Paragraph = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  line-height: 1.8;
  white-space: pre-wrap;
`;

export const ContentSectionWrapper = styled(ContentWrapper)`
  margin: 20px 0 40px 0;
`;

interface ContentSectionProps {
  contents: PostContent[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ contents }) => {
  return (
    <ContentSectionWrapper>
      {contents.map((block, idx) =>
        block.contentType === 'TEXT' ? (
          <Paragraph key={idx}>{block.content}</Paragraph>
        ) : (
          <Image
            key={idx}
            src={block.content}
            alt={`image-${idx}`}
            width="100%"
            height="auto"
            borderRadius="4px"
            objectFit="cover"
            style={{ marginBottom: '24px' }}
          />
        ),
      )}
    </ContentSectionWrapper>
  );
};

export default ContentSection;
