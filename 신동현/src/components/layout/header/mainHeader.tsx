import { Create } from "@/assets";
import Button from "@/components/ui/Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MainHeader = () => {
    return (
        <Container>
            <Button 
                width="120px"
                height="40px"
                fontSize="14px"
                color="#909090"
                backgroundcolor="#FFFFFF"
                icon={<Create />}
                onClick={() => {}}
            >
                깃로그 쓰기
            </Button>
        </Container>
    );
};

export default MainHeader;  