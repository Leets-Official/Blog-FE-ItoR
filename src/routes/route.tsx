import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/home';
import MyPage from '@/pages/my';
import Signup from '@/pages/signup';

const router = createBrowserRouter([
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: '/my',
    element: <MyPage />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default router;
