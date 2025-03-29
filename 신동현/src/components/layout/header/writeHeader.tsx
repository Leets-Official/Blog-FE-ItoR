import Button from "@/components/ui/Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WriteHeader = () => {
    return (
        <Container>
            <Button 
                width="76px"
                height="40px"
                fontSize="14px"
                color="#FF3F3F"
                backgroundcolor="#FFFFFF"
                onClick={() => {}}
            > 삭제하기
            </Button>
            <Button 
                width="76px"
                height="40px"
                fontSize="14px"
                color="#000000"
                backgroundcolor="#FFFFFF"
                onClick={() => {}}
            > 게시하기
            </Button>            
        </Container>
    );
};

export default WriteHeader;
