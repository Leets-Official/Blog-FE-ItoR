import BlogMeta from '@/components/blog/BlogMeta';
import { BlogPost } from '@/types/blogPost';
import styled from 'styled-components';

const BlogTitleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 0px;
  justify-content: center;
  border-bottom: 1px solid #f5f5f5;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 688px;
  padding: 12px 16px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 136px;
`;

const TitleText = styled.h1`
  margin-bottom: 32px;
`;

interface BlogTitleProps {
  post: BlogPost;
}

const BlogTitle: React.FC<BlogTitleProps> = ({ post }) => {
  return (
    <BlogTitleContainer>
      <TextWrapper>
        <TitleText>{post.title}</TitleText>
        <BlogMeta post={post} isBlogDetail={true} />
      </TextWrapper>
    </BlogTitleContainer>
  );
};

export default BlogTitle;
