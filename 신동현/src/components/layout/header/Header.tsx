import { HeaderLogo, Reorder } from "@/assets";
import styled from "styled-components";
import MainHeader from "./MainHeader";
import WriteHeader from "./WriteHeader";
import DetailHeader from "./DetailHeader";
import { useState } from "react";
import SideBar from "@/components/layout/SideBar";
import Button from "@/components/ui/Button/Button";

const HeaderContainer = styled.div`
  margin-top: 0px;
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
  type?: "main" | "write" | "detail";
}

const Header = ({ type }: HeaderProps) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const setSideBarOpen = () => {
    setIsSideBarOpen((current) => !current);
  }

  return (
    <>
      <HeaderContainer>
        <LeftContainer>
          <Button onClick={setSideBarOpen} icon={<Reorder />} backgroundColor="#FFFFFF"></Button>
          <HeaderLogo />
        </LeftContainer>
        <RightContainer>
          {type === "main" && <MainHeader />}
          {type === "write" && <WriteHeader />}
          {type === "detail" && <DetailHeader />}
        </RightContainer>
      </HeaderContainer>
      {isSideBarOpen && <SideBar isLogin={true} />}
    </>
  );
};

export default Header;
