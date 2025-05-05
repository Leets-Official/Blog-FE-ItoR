import styled from "styled-components";
import PageButton from "@/components/ui/Button/PageButton";
import { Left, Right } from "@/assets";

const Wrapper = styled.div`
  margin: 20px 0px 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

interface PaginationProps {
  currentPage: number;
  totalPosts: number;
  limitPost: number;
  limitPage: number;
  setPage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPosts, limitPost, limitPage, setPage }: PaginationProps) => {
  const numPages = Math.ceil(totalPosts / limitPost);
  const firstPage = Math.floor((currentPage - 1) / limitPage) * limitPage + 1;
  const lastPage = Math.min(firstPage + limitPage - 1, numPages);

  const pageMap = Array.from({ length: lastPage - firstPage + 1 }, (_, i) => i + firstPage);

  return (
    <Wrapper>
      <ButtonContainer>
        <PageButton onClick={() => setPage(firstPage - 1)} disabled={firstPage === 1} icon={<Left />} type={firstPage === 1 ? "inactive" : "active"}></PageButton>
        {pageMap.map((page) => (
          <PageButton key={page} onClick={() => setPage(page)} type={page === currentPage ? "current" : "active"} disabled={page === currentPage}>{page}</PageButton>
        ))}
        <PageButton onClick={() => setPage(Math.min(lastPage + 1, numPages))} disabled={lastPage === numPages} icon={<Right />} type={lastPage === numPages ? "inactive" : "active"} ></PageButton>
      </ButtonContainer>
    </Wrapper>
  )
}

export default Pagination;
