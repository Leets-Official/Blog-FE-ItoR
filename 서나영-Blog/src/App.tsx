import GlobalStyle from './styles/global';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import Signup from '@/pages/signup/Signup';
import SignupSelect from '@/pages/signup/SignupSelect';
import Home from '@/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ToastProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signup/select' element={<SignupSelect />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
