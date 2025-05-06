import { Header } from '@/components/index';
import PostList from '@/components/home/PostList';
import { useEffect, useState } from 'react';
import { Post } from '@/types/post';
import { getPostsWithTokenApi } from '@/api/post/post.api';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 10;

  const fetchPosts = async (page: number) => {
    try {
      const response = await getPostsWithTokenApi({ page, size });
      setPosts(response.data);
      console.log('게시물 조회 성공');
    } catch (err) {
      console.error('게시물 불러오기 실패', err);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  return (
    <div>
      <Header variant="write" />
      <PostList posts={posts} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};
export default HomePage;
