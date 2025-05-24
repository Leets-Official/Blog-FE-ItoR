import { GITLOG, Hamburger } from "@/assets";
import styled from "styled-components";
import MainHeader from "./MainHeader";
import WriteHeader from "./WriteHeader";
import DetailHeader from "./DetailHeader";
import SideBar from "@/components/layout/sideBar/SideBar";
import Button from "@/components/ui/Button/Button";
import MyPageHeader from "./MyPageHeader";
import { useContext } from "react";
import { SideBarContext } from "@/pages/Root";
import { useNavigate } from "react-router-dom";

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
  type : "main" | "write" | "detail" | "mypage";
  onPublish?: () => void;
}

const Header = ({ type, onPublish }: HeaderProps) => {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(SideBarContext);
  const isLogin = localStorage.getItem("refreshToken") ? true : false;
  const navigate = useNavigate();

  const setSideBarOpen = () => {
    setIsSideBarOpen(!isSideBarOpen);
  }

  const handleLogoClick = () => {
    if (isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
    window.location.reload();
  }

  return (
    <>
      <HeaderContainer>
        <LeftContainer>
          <Button onClick={setSideBarOpen} icon={<Hamburger width="24px" height="24px" fill="#333333" />} backgroundColor="#FFFFFF" />
          <Button onClick={handleLogoClick} icon={<GITLOG width="77px" height="40px" fill="black" />} backgroundColor="#FFFFFF" />
        </LeftContainer>
        <RightContainer>
          {type === "main" && <MainHeader />}
          {type === "write" && <WriteHeader onPublish={onPublish} />}
          {type === "detail" && <DetailHeader/>}
          {type === "mypage" && onPublish && <MyPageHeader onPublish={onPublish} />}
        </RightContainer>
      </HeaderContainer>
      {isSideBarOpen && <SideBar isOpen={isSideBarOpen} onClose={setSideBarOpen} isLogin={isLogin} />}
    </>
  );
};

export default Header;
