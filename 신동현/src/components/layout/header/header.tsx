import { HeaderLogo, Reorder } from "@/assets";
import styled from "styled-components";
import MainHeader from "./mainHeader";
import WriteHeader from "./writeHeader";
import DetailHeader from "./detailHeader";
const Container = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  position: fixed;
  background-color: #ffffff;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const LeftContainer = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MenuButton = styled.div`
  display: flex;
  margin-right: 10px;
  cursor: pointer;
`;

const RightContainer = styled.div`
  position: absolute;
  right: 0;
  margin-right : 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface HeaderProps {
    type: "main" | "write" | "detail";
}

const Header = ({ type }: HeaderProps) => {
    return (
        <Container>
            <LeftContainer>
                <MenuButton>
                    <Reorder />
                </MenuButton>
                <HeaderLogo />
            </LeftContainer>
            <RightContainer>
                {type === "main" && <MainHeader />}
                {type === "write" && <WriteHeader />}
                {type === "detail" && <DetailHeader />}
            </RightContainer>
        </Container>
    );
};

export default Header;
