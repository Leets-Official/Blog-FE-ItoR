import { WriteSvg } from '@/assets';
import Button from '@/components/common/Button/Button';
import theme from '@/styles/theme.styled';
import { flexAlignCenter } from '@/styles/common.styled';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/context/ModalContext';
import { useUser } from '@/context/UserContext';

export const Container = styled.div`
  ${flexAlignCenter}
  cursor:pointer;
`;

const WriteRight: React.FC = () => {
  const nav = useNavigate();
  const { openModal } = useModal();
  const { user, isLoggedIn } = useUser();

  const handleClick = () => {
    if (isLoggedIn && user) {
      nav('/post/write');
    } else {
      openModal('login');
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
