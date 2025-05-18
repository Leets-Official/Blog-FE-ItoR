import styled from "styled-components";
import LoginedSideBar from "./LoginedSideBar";
import NotLoginedSideBar from "./NotLoginedSideBar";

const SideBarContainer = styled.div`
  float: left;
  width: 240px;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 99;
`;

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
}

const SideBar = ({ isOpen, onClose, isLogin }: SideBarProps) => {
  if (!isOpen) return null;
  return (
    <Overlay onClick={onClose}>
      <SideBarContainer onClick={(e) => e.stopPropagation()}>
        {isLogin ? (
          <LoginedSideBar />
        ) : (
          <NotLoginedSideBar />
        )}
      </SideBarContainer>
    </Overlay>
  );
};

export default SideBar;
