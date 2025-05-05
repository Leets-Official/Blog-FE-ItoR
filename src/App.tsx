import { RouterProvider } from 'react-router-dom';
import router from '@/routes/route';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme.styled';
import GlobalStyles from '@/styles/global.styled';
import { ModalProvider } from '@/context/ModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
