import Header from "@/components/layout/header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

export const SideBarContext = createContext<{
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isOpen: boolean) => void;
}>({
  isSideBarOpen: false,
  setIsSideBarOpen: () => {},
});

const Root = () => {
  const location = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    setIsSideBarOpen(false);
  }, [location.pathname]);

  const getHeaderType = () => {
    if (location.pathname === '/' || location.pathname === '/signUp' || location.pathname === '/signUp/detail') return 'main';
    if (location.pathname === '/mypage') return 'mypage';
    return null;
  };

  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
        {getHeaderType() === null ? null : <Header type={getHeaderType() as "main" | "mypage" | "write" | "detail"} />}
        <Outlet />
    </SideBarContext.Provider>
  )
}

export default Root;
