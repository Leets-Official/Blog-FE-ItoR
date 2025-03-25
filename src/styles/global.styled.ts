import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`

 // Reset CSS
 ${reset}
 * {
    box-sizing: border-box;
    list-style: none;
  }
  button {
    border: none;
  }

`;

export default GlobalStyles;
