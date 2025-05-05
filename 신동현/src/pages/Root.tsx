import Header from "@/components/layout/header/Header";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
    const location = useLocation();
    
    const getHeaderType = () => {
        if (location.pathname === '/' || location.pathname === '/signUp' || location.pathname === '/signUp/detail') return 'main';
        if (location.pathname === '/mypage') return 'mypage';
        if (location.pathname === '/write') return 'write';
        if (location.pathname.startsWith('/detail/')) return 'detail';
        return 'main';
    };

    return (
        <div>
            <Header type={getHeaderType()} />
            <Outlet />
        </div>
    )
}

export default Root;
