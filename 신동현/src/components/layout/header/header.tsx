import { HeaderLogo, Reorder } from "@/assets";
import styled from "styled-components";
import MainHeader from "./mainHeader";
import WriteHeader from "./writeHeader";
import DetailHeader from "./detailHeader";
import { useState } from "react";
import Frame from "@/components/layout/sideBar";
import Button from "@/components/ui/Button";

const HeaderContainer = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  position: sticky;
  background-color: #ffffff;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;

const LeftContainer = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
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
  type ?: "main" | "write" | "detail";
}

const Header = ({ type }: HeaderProps) => {
  const [isFrameOpen, setIsFrameOpen] = useState(false);

  const setFrameOpen = () => {
    setIsFrameOpen((current) => !current);
  }

  return (
    <>
      <HeaderContainer>
        <LeftContainer>
          <Button onClick={setFrameOpen} icon={<Reorder />} backgroundColor="#FFFFFF"></Button>
          <HeaderLogo />
        </LeftContainer>
        <RightContainer>
          {type === "main" && <MainHeader />}
          {type === "write" && <WriteHeader />}
          {type === "detail" && <DetailHeader />}
        </RightContainer>
      </HeaderContainer>
      {isFrameOpen && <Frame isLogin={false} />}
    </>
  );
};

export default Header;
