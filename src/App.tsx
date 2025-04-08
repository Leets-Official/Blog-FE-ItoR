import { RouterProvider } from 'react-router-dom';
import router from '@/routes/route';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme.styled';
import GlobalStyles from '@/styles/global.styled';
import { LoginModalProvider } from '@/context/LoginModalContext';

function App() {
  return (
    <LoginModalProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </LoginModalProvider>
  );
}

export default App;
