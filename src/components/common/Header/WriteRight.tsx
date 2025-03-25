import WriteSvg from '@/assets/icon/ic_create.svg?react';
import Button from '@/components/common/Button/Button';
import theme from '@/styles/theme.styled';
import { flexAlignCenter } from '@/styles/common.styled';
import styled from 'styled-components';

export const Container = styled.div`
  ${flexAlignCenter}
`;

const WriteRight: React.FC<{ onClick?: (action: string) => void }> = ({ onClick }) => {
  return (
    <Container>
      <WriteSvg style={{ color: theme.COLORS.gray[56] }} />
      <Button
        variant="text"
        size="sm"
        textColor={theme.COLORS.gray[56]}
        onClick={() => onClick?.('write')}
      >
        깃로그 쓰기
      </Button>
    </Container>
  );
};

export default WriteRight;
