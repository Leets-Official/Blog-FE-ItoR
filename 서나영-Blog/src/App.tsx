import GlobalStyle from './styles/global';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ToastProvider>
        <Routes>
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
