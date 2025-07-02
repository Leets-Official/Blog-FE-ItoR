import styled from 'styled-components';
import BlogMeta from '@/components/blog/BlogMeta';
import { BlogPost } from '@/types/blogPost';
import Image from '@/components/ui/Image';

const PostItemContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 688px;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: stretch;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const PostTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px 0px;
  min-width: 0;
`;

const PostTitle = styled.p`
  font-weight: 500;
  letter-spacing: -0.04px;
  color: #000;
  margin-bottom: 2px;
`;

const PostContent = styled.p`
  font-family: 'Noto Sans L';
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.07px;
  color: #555;
  margin-bottom: 12px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  flex-shrink: 0;
  margin-right: 8px;
`;

interface PostItemProps {
  post: BlogPost;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const firstTextContent = post.contents.find((item) => item.contentType === 'TEXT')?.content || '';
  const firstImageContent =
    post.contents.find((item) => item.contentType === 'IMAGE')?.content || '';

  return (
    <PostItemContainer>
      <PostTextWrapper>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>{firstTextContent}</PostContent>
        <BlogMeta post={post} />
      </PostTextWrapper>
      {firstImageContent && (
        <ImageWrapper>
          <Image src={firstImageContent} alt={post.title} thumbnail borderRadius='2px' />
        </ImageWrapper>
      )}
    </PostItemContainer>
  );
};

export default PostItem;
