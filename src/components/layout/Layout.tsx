import { Outlet } from 'react-router-dom';
import ModalLayer from '@/components/common/Modal/ModalLayer';

const Layout = () => {
  return (
    <>
      <Outlet />
      <ModalLayer />
    </>
  );
};

export default Layout;
