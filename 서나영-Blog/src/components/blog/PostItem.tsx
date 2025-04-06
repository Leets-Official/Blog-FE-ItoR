import styled from 'styled-components';
import PostMeta from './PostMeta';
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
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding: 8px 0px;
  min-width: 0;
`;

const PostTitle = styled.p`
  font-family: 'Noto Sans M';
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.04px;
  color: #000;
  margin-bottom: 2px;
`;

const PostContent = styled.p`
  font-family: 'Noto Sans L';
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
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
`;

interface PostItemProps {
  post: BlogPost;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <PostItemContainer>
      <PostTextWrapper>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>{post.content}</PostContent>
        <PostMeta post={post} />
      </PostTextWrapper>
      {post.imageUrl && (
        <ImageWrapper>
          <Image src={post.imageUrl} alt={post.title} thumbnail borderRadius='2px' />
        </ImageWrapper>
      )}
    </PostItemContainer>
  );
};

export default PostItem;
