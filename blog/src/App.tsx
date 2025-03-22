import { RouterProvider } from 'react-router-dom';
import router from '@/routes/route';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme.styled';
import GlobalStyles from '@/styles/global.styled';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
