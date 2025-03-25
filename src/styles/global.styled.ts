import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`

 // Reset CSS
 ${reset}
 * {
    box-sizing: border-box;
    list-style: none;
    font-family: 'NotoSans', sans-serif;
  }
  button {
    border: none;
  }

@font-face {
  font-family: 'NotoSans';
  src: url('/font/NotoSansKr-Regular.ttf') format('truetype');
}
`;

export default GlobalStyles;
