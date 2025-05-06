import { Header } from '@/components/index';
import PostList from '@/components/home/PostList';
import { useEffect, useState } from 'react';
import { Post } from '@/types/post';
import { getPostsApi, getPostsWithTokenApi } from '@/api/post/post.api';
import { useUser } from '@/context/UserContext';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 10;

  const { isLoggedIn, user } = useUser();

  const fetchPosts = async (page: number) => {
    try {
      const response =
        isLoggedIn && user
          ? await getPostsWithTokenApi({ page, size })
          : await getPostsApi({ page, size });

      setPosts(response.data);
      console.log('게시물 조회 성공');
    } catch (err) {
      console.error('게시물 조회 실패', err);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, isLoggedIn]);

  return (
    <div>
      <Header variant="write" />
      <PostList posts={posts} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};
export default HomePage;
