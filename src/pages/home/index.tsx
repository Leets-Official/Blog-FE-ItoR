import Button from '@/components/common/Button/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Button variant="kakao" size="md" rounded="md">
        카카오로 로그인
      </Button>
      <Button variant="secondary" size="xs" rounded="full">
        등록
      </Button>
      <Button variant="black" size="xs" rounded="full">
        등록
      </Button>
      <Button variant="primary" size="lg" rounded="md">
        이메일로 로그인
      </Button>
    </div>
  );
};
export default HomePage;
