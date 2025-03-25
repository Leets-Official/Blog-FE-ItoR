import { flexAlignCenter } from '@/styles/common.styled';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.COLORS.white};
  height: 72px;
  padding: 20px;
`;

export const SectionWrapper = styled.div`
  ${flexAlignCenter}
  gap:16px;
`;
