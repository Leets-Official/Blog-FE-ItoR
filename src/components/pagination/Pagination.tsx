import { PrevSvg, NextSvg } from '@/assets';
import { flexCenter } from '@/styles/common.styled';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 40px 0;
`;

const ArrowButton = styled.button<{ disabled?: boolean }>`
  ${flexCenter}
  width: 32px;
  height: 32px;
  border-radius: 2px;
  border: 1.5px solid ${({ theme }) => theme.COLORS.neutral[5]};
  color: ${({ disabled, theme }) => (disabled ? theme.COLORS.neutral[5] : theme.COLORS.black)};
  background-color: ${({ theme }) => theme.COLORS.white};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const PageButton = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 2px;
  border: 1.5px solid
    ${({ $active, theme }) => ($active ? theme.COLORS.primary[6] : theme.COLORS.neutral[5])};
  color: ${({ $active, theme }) => ($active ? theme.COLORS.primary[6] : theme.COLORS.black)};
  background-color: ${({ theme }) => theme.COLORS.white};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.COLORS.primary[6]};
    color: ${({ theme }) => theme.COLORS.primary[6]};
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  size?: number;
  pagesPerGroup?: number; // 한번에 보여줄 페이지 버튼 수
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  size = 10,
  pagesPerGroup = 5,
  onPageChange,
}) => {
  const totalItems = Math.ceil(totalPages / size);
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePrevGroup = () => {
    if (startPage > 1) onPageChange(startPage - 1);
  };

  const handleNextGroup = () => {
    if (endPage < totalItems) onPageChange(endPage + 1);
  };

  return (
    <Wrapper>
      <ArrowButton disabled={startPage === 1} onClick={handlePrevGroup}>
        <PrevSvg />
      </ArrowButton>
      {pageNumbers.map((page) => (
        <PageButton key={page} onClick={() => onPageChange(page)} $active={currentPage === page}>
          {page}
        </PageButton>
      ))}
      <ArrowButton disabled={endPage === totalPages} onClick={handleNextGroup}>
        <NextSvg />
      </ArrowButton>
    </Wrapper>
  );
};

export default Pagination;
