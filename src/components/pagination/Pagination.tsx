import { PrevSvg, NextSvg } from '@/assets';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  size?: number;
  pagesPerGroup?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  size = 10,
  pagesPerGroup = 5,
  onPageChange,
}) => {
  return <div></div>;
};

export default Pagination;
