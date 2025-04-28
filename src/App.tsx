import { RouterProvider } from 'react-router-dom';
import router from '@/routes/route';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme.styled';
import GlobalStyles from '@/styles/global.styled';
import { ModalProvider } from '@/context/ModalContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
