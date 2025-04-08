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

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ToastProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog/editor' element={<BlogEditor />} />
          <Route path='/blog/:postId' element={<BlogDetail />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signup/select' element={<SignupSelect />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/mypage/setting' element={<MyPageSetting />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
