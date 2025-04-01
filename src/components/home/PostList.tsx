import styled from 'styled-components';
import PostItem from '@/components/home/PostItem';
import { Pagination } from '@/components/index';
import { Post } from '@/types/post';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 36px 16px;
`;

const Line = styled.div`
  border: 1px solid ${({ theme }) => theme.COLORS.gray[96]};
`;

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const size = 10;

  const startIdx = (currentPage - 1) * size;
  const endIdx = startIdx + size;
  const currentPosts = posts.slice(startIdx, endIdx);
  return (
    <Wrapper>
      {currentPosts.map((post) => (
        <div key={post.id}>
          <PostItem post={post} />
          <Line />
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={posts.length}
        onPageChange={setCurrentPage}
        size={size}
        pagesPerGroup={5}
      />
    </Wrapper>
  );
};

export default PostList;
