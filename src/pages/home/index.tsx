import Button from '@/components/common/Button/Button';
import KakaoSvg from '@/assets/icon/ic_kakao_logo.svg?react';
import styled from 'styled-components';
import { flexColumn } from '@/styles/common.styled';
import PencilSvg from '@/assets/icon/ic_create.svg?react';
import Input from '@/components/common/Input/Input';

const Flex = styled.div`
  ${flexColumn}
  gap:12px;
  padding-left: 20px;
`;
const HomePage: React.FC = () => {
  return (
    <Flex>
      <h1>Home Page</h1>
      {/* 버튼 예시 */}
      <Button variant="kakao" size="lg" rounded="md">
        <KakaoSvg />
        카카오로 로그인
      </Button>
      <Button variant="black" size="xs" rounded="full">
        등록
      </Button>
      <Button variant="secondary" size="md" rounded="full">
        <PencilSvg />
        깃로그 시작하기
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

      <Input label="닉네임" placeholder="닉네임" />
      <Input label="이름" placeholder="이름" readOnly />
      <Input as="textarea" rows={9} placeholder="댓글을 입력하세요." />
    </Flex>
  );
};
export default HomePage;
