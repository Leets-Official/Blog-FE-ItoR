import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/layout/header/Header';
import Pagination from '@/components/pagination/Pagination';
import PostList from '@/components/blog/PostList';
import { getPostList, getPostListWithToken } from '@/api/blog/postAPI';
import { BlogPostListResponse } from '@/types/blogPost';
import { useQuery } from '@tanstack/react-query';

const pageSize = 10;

const HomeContainer = styled.div`
  padding-top: 32px;
`;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const token = localStorage.getItem('accessToken');
  const fetcher = token ? getPostListWithToken : getPostList;

  const queryKey = ['posts', currentPage, token];
  const queryFn = () => fetcher(currentPage, pageSize);

  const { data } = useQuery<BlogPostListResponse>({
    queryKey,
    queryFn,
    placeholderData: (previousData) => previousData,
  });

  return (
    <HomeContainer>
      <Header type='CreateLog' />
      <PostList posts={data?.post || []} />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.pageMax || 1}
        onPageChange={setCurrentPage}
      />
    </HomeContainer>
  );
};

export default Home;
