import Button from '@/components/common/Button/Button';
import Svg from '@/assets/icon/ic_create.svg?react';
import styled from 'styled-components';
import { flexColumn } from '@/styles/common.styled';

const Flex = styled.div`
  ${flexColumn}
  gap:12px;
`;
const HomePage: React.FC = () => {
  return (
    <Flex>
      <h1>Home Page</h1>
      {/* 버튼 예시 */}
      <Button variant="kakao" size="lg" rounded="md">
        <Svg />
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
      <Button variant="primary-outline" size="xl" rounded="full">
        이메일로 로그인
      </Button>
      <Button variant="negative" size="lg" rounded="md">
        삭제하기
      </Button>
    </Flex>
  );
};
export default HomePage;
