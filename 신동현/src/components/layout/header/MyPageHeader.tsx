import Button from "@/components/ui/Button/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MyPageHeader = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Button
        width="76px"
        height="40px"
        fontSize="14px"
        color="#FF3F3F"
        backgroundColor="#FFFFFF"
        onClick={() => navigate(-1)}
      > 취소하기
      </Button>
      <Button
        width="76px"
        height="40px"
        fontSize="14px"
        color="#000000"
        backgroundColor="#FFFFFF"
        onClick={() => navigate(-1)}
      > 저장하기
      </Button>
    </Container>
  );
};

export default MyPageHeader;
