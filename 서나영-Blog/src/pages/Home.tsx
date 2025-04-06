import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/layout/header/Header';
import Pagination from '@/components/pagination/Pagination';
import PostList from '@/components/blog/PostList';
import { mockPosts } from '@/mocks/mockPosts';

const pageSize = 5;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockPosts.length / pageSize);

  const startIdx = (currentPage - 1) * pageSize;
  const currentPosts = mockPosts.slice(startIdx, startIdx + pageSize);

  return (
    <>
      <Header type='CreateLog' />
      <PostList posts={currentPosts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Home;
