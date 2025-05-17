import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@/components/layout/header/Header';
import Pagination from '@/components/pagination/Pagination';
import PostList from '@/components/blog/PostList';
import { getPostList, getPostListWithToken } from '@/api/blog/postAPI';
import { BlogPost } from '@/types/blogPost';

const pageSize = 5;

const HomeContainer = styled.div`
  padding-top: 32px;
`;

const Home = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const fetcher = token ? getPostListWithToken : getPostList;
      const data = await fetcher(currentPage, pageSize);

      setPosts(data);
      setTotalPages(Math.ceil(data.length / pageSize) || 1);
    } catch (error) {
      console.error('게시글 목록을 불러오지 못했습니다.', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, location.state?.refresh]);

  return (
    <HomeContainer>
      <Header type='CreateLog' />
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </HomeContainer>
  );
};

export default Home;
