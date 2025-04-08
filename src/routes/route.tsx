import { createBrowserRouter } from 'react-router-dom';
import { HomePage, MyPage, Post, Signup } from '@/pages';
import BlogDetail from '@/pages/blogDetail';

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
  {
    path: '/post/:postId',
    element: <BlogDetail />,
  },
]);

export default router;
