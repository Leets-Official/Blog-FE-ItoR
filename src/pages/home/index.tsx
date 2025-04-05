import { Header } from '@/components/index';
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
