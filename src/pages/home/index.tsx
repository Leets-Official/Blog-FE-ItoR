import Header from '@/components/common/Header/Header';
import PostList from '@/components/home/PostList';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header variant="write" />
      <PostList />
    </div>
  );
};
export default HomePage;
