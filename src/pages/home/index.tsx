import Header from '@/components/common/Header/Header';
import PostList from '@/components/home/PostList';
import { mockPosts } from '@/__mocks__/mockPost';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header variant="write" />
      <PostList posts={mockPosts} />
    </div>
  );
};
export default HomePage;
