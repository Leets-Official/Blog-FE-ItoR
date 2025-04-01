import { createGlobalStyle } from 'styled-components';
import AppleSDGothicNeoM from '@/fonts/AppleSDGothicNeoM.ttf';
import NotoSansKRMedium from '@/fonts/NotoSansKR-Medium.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans';
    src: url(${NotoSansKRMedium}) format('truetype');
}

  @font-face {
    font-family: 'AppleSDGothicNeoM';
    src: url(${AppleSDGothicNeoM}) format('truetype');
}

body {
  background-color: #FFF;
  font-family: 'Noto Sans', sans-serif;;
}
`;

export default GlobalStyle;
