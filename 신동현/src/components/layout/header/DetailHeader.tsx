import { Chat, More_vert } from "@/assets";
import Button from "@/components/ui/Button/Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailHeader = () => {
  return (
    <Container>
      <Button
        width="40px"
        height="40px"
        fontSize="14px"
        color="#909090"
        backgroundColor="#FFFFFF"
        icon={<Chat width="24px" height="24px" fill="#333333" />}
        onClick={() => { }}
      >
      </Button>
      <Button
        width="40px"
        height="40px"
        fontSize="14px"
        color="#909090"
        backgroundColor="#FFFFFF"
        icon={<More_vert width="24px" height="24px" fill="#333333" />}
        onClick={() => { }}
      >
      </Button>
    </Container>
  );
};

export default DetailHeader;
