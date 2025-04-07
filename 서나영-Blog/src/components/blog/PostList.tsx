import { useNavigate } from 'react-router-dom';
import PostItem from '@/components/blog/PostItem';
import styled from 'styled-components';
import { BlogPost } from '@/types/blogPost';

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 688px;
  width: 100%;
  margin: 0 auto;
  margin-top: 104px;
  overflow-x: hidden;
  box-sizing: border-box;
`;

interface PostListProps {
  posts: BlogPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <PostListContainer>
      {posts.map((post) => (
        <div key={post.postId} onClick={() => navigate(`/blog/${post.postId}`)}>
          <PostItem post={post} />
        </div>
      ))}
    </PostListContainer>
  );
};

export default PostList;
