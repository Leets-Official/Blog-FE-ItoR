import { createBrowserRouter } from 'react-router-dom';
import { HomePage, MyPage, Post, Signup } from '@/pages';

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
  {
    path: '/post/write',
    element: <Post />,
  },
]);

export default router;
