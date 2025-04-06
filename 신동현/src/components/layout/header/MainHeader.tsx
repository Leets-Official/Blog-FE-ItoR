import { Create } from "@/assets";
import Button from "@/components/ui/Button/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MainHeader = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Button
        width="120px"
        height="40px"
        fontSize="14px"
        color="#909090"
        backgroundColor="#FFFFFF"
        icon={<Create width="24px" height="24px" fill="#333333" />}
        onClick={() => {
          navigate("/Write");
        }}
      >
        깃로그 쓰기
      </Button>
    </Container>
  );
};

export default MainHeader;  