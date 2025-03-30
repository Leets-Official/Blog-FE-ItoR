import { Chat, More_vert } from "@/assets";
import Button from "@/components/ui/Button";
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
                icon={<Chat />}
                onClick={() => {}}
            >
            </Button>
            <Button 
                width="40px"
                height="40px"
                fontSize="14px"
                color="#909090"
                backgroundColor="#FFFFFF"
                icon={<More_vert />}
                onClick={() => {}}
            >
            </Button>            
        </Container>
    );
};

export default DetailHeader;
