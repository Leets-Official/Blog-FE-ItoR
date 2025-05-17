import styled from 'styled-components';
import { Left, Right } from '@/assets';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 688px;
  margin: 32px auto 64px;
`;

const PageButton = styled.button<{ disabled?: boolean; $isActive?: boolean }>`
  display: flex;
  width: 32px;
  height: 32px;
  padding: 1px 7px;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  font-size: 14px;
  line-height: 22px;
  background: #fff;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  border: 1px solid ${({ $isActive }) => ($isActive ? '#1890FF' : '#D9D9D9')};

  color: ${({ $isActive, disabled }) => (disabled ? '#D9D9D9' : $isActive ? '#1890FF' : '#000')};

  &:hover {
    border: 1px solid ${({ disabled }) => (disabled ? '#D9D9D9' : '#1890FF')};
    color: ${({ disabled }) => (disabled ? '#D9D9D9' : '#1890FF')};
  }
`;

const NavButton = styled(PageButton)`
  padding: 10px;

  &:hover svg path {
    fill: ${({ disabled }) => (disabled ? '#D9D9D9' : '#1890FF')};
  }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const maxVisible = 5;
    const pages: number[] = [];

    const total = totalPages;
    const start = Math.floor(currentPage / maxVisible) * maxVisible;
    const end = Math.min(start + maxVisible, total);

    for (let i = start; i < end && i < total; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePrev = () => {
    const target = Math.max(0, currentPage - 5);
    if (target !== currentPage) onPageChange(target);
  };

  const handleNext = () => {
    const target = Math.min(totalPages - 1, currentPage + 5);
    if (target !== currentPage) onPageChange(target);
  };

  const isPrevDisabled = currentPage < 5;
  const isNextDisabled = currentPage + 5 >= totalPages;

  return (
    <PaginationContainer>
      <NavButton onClick={handlePrev} disabled={isPrevDisabled}>
        <Left width={14} height={14} fill={isPrevDisabled ? '#D9D9D9' : '#1890FF'} />
      </NavButton>

      {getVisiblePages().map((page) => (
        <PageButton key={page} onClick={() => onPageChange(page)} $isActive={page === currentPage}>
          {page + 1}
        </PageButton>
      ))}

      <NavButton onClick={handleNext} disabled={isNextDisabled}>
        <Right width={14} height={14} fill={isNextDisabled ? '#D9D9D9' : '#1890FF'} />
      </NavButton>
    </PaginationContainer>
  );
};

export default Pagination;
