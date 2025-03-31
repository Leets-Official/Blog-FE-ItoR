import PostItem from '@/components/home/PostItem';
import { Post } from '@/types/post';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 36px 16px;
`;

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Wrapper>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Wrapper>
  );
};

export default PostList;
