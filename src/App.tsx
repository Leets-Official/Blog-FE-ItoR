import GlobalStyle from './styles/global';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import Signup from '@/pages/signup/Signup';
import SignupSelect from '@/pages/signup/SignupSelect';
import BlogDetail from '@/pages/BlogDetail';
import Home from '@/pages/Home';
import MyPage from '@/pages/mypage/MyPage';
import MyPageSetting from '@/pages/mypage/MyPageSetting';
import BlogEditor from '@/pages/BlogEditor';
import KakaoLoginProcess from './pages/signup/kakaoLoginProcess';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog/editor' element={<BlogEditor />} />
            <Route path='/blog/editor/:postId' element={<BlogEditor />} />
            <Route path='/blog/:postId' element={<BlogDetail />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup/select' element={<SignupSelect />} />
            <Route path='/oauth/kakao/success' element={<KakaoLoginProcess />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/mypage/setting' element={<MyPageSetting />} />
          </Routes>
        </ToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
