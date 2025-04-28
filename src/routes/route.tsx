import { createBrowserRouter } from 'react-router-dom';
import { HomePage, MyPage, Post, Signup, BlogDetail } from '@/pages';
import { Layout } from '@/components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/my', element: <MyPage /> },
      { path: '/signup', element: <Signup /> },
      { path: '/signup/:type', element: <Signup /> },
      { path: '/post/write', element: <Post /> },
      { path: '/post/:postId', element: <BlogDetail /> },
    ],
  },
]);

export default router;
