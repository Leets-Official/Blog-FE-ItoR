import Button from '@/components/common/Button/Button';
import KakaoSvg from '@/assets/icon/ic_kakao_logo.svg?react';
import styled from 'styled-components';
import { flexColumn } from '@/styles/common.styled';
import PencilSvg from '@/assets/icon/ic_create.svg?react';
import Input from '@/components/common/Input/Input';
import Header from '@/components/common/Header/Header';
import theme from '@/styles/theme.styled';
import Toast, { ToastType } from '@/components/common/Toast/Toast';
import { useState } from 'react';

const Flex = styled.div`
  ${flexColumn}
  gap:12px;
  /* padding-left: 20px; */
`;
const HomePage: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  return (
    <Flex>
      <Header />
      <Header variant="detail" />
      <Header
        variant="action"
        negativeLabel="삭제하기"
        confirmLabel="게시하기"
        onClickNegative={() => console.log('삭제')}
        onClickConfirm={() => console.log('게시')}
      />
      {/* 버튼 예시 */}
      <Button variant="kakao" size="lg" rounded="md">
        <KakaoSvg />
        카카오로 로그인
      </Button>
      <Button variant="text" size="xs" rounded="full" textColor={theme.COLORS.gray[56]}>
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

      <Button
        variant="text"
        size="sm"
        rounded="full"
        textColor={theme.COLORS.positive}
        onClick={() => showToast('저장되었습니다!', 'success')}
      >
        저장 성공 토스트
      </Button>

      <Button
        variant="text"
        size="sm"
        rounded="full"
        textColor={theme.COLORS.negative}
        onClick={() => showToast('내용을 입력해주세요!', 'error')}
      >
        에러 토스트
      </Button>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </Flex>
  );
};
export default HomePage;
