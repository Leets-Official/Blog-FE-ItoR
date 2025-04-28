import { ContentWrapper } from '@/pages/post';
import styled from 'styled-components';
import { Image } from '@/components';

interface ContentSectionProps {
  content: string;
  image?: string;
}

const Paragraph = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  line-height: 1.8;
  white-space: pre-wrap;
`;

export const ContentSectionWrapper = styled(ContentWrapper)`
  margin: 20px 0 40px 0;
`;

const ContentSection: React.FC<ContentSectionProps> = ({ content, image }) => {
  return (
    <ContentSectionWrapper>
      <Paragraph>{content}</Paragraph>
      {image && (
        <Image
          src={image}
          alt="post-image"
          width="100%"
          height="auto"
          borderRadius="4px"
          objectFit="cover"
        />
      )}
    </ContentSectionWrapper>
  );
};

export default ContentSection;
