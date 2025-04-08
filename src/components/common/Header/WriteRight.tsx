import { WriteSvg } from '@/assets';
import Button from '@/components/common/Button/Button';
import theme from '@/styles/theme.styled';
import { flexAlignCenter } from '@/styles/common.styled';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLoginModal } from '@/context/LoginModalContext';

export const Container = styled.div`
  ${flexAlignCenter}
  cursor:pointer;
`;

const WriteRight: React.FC = () => {
  const nav = useNavigate();
  const { open: openLoginModal } = useLoginModal();

  const handleClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      openLoginModal();
    } else {
      nav('/post/write');
    }
  };

  return (
    <Container onClick={handleClick}>
      <WriteSvg style={{ color: theme.COLORS.gray[56] }} />
      <Button variant="text" size="sm" textColor={theme.COLORS.gray[56]}>
        깃로그 쓰기
      </Button>
    </Container>
  );
};

export default WriteRight;
