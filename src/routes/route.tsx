import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/home';
import MyPage from '@/pages/my';

const router = createBrowserRouter([
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/my',
    element: <MyPage />,
  },
]);

export default router;
