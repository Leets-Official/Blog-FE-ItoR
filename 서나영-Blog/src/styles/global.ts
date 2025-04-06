import { createGlobalStyle } from 'styled-components';
import AppleSDGothicNeoM from '@/fonts/AppleSDGothicNeoM.ttf';
import NotoSansKRMedium from '@/fonts/NotoSansKR-Medium.ttf';
import NotoSansKRLight from '@/fonts/NotoSansKR-Light.ttf';
import NotoSansKRRegular from '@/fonts/NotoSansKR-Regular.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans M';
    src: url(${NotoSansKRMedium}) format('truetype');
}
@font-face {
    font-family: 'Noto Sans R';
    src: url(${NotoSansKRRegular}) format('truetype');
}

@font-face {
    font-family: 'Noto Sans L';
    src: url(${NotoSansKRLight}) format('truetype');
}

  @font-face {
    font-family: 'AppleSDGothicNeoM';
    src: url(${AppleSDGothicNeoM}) format('truetype');
}

body {
  background-color: #FFF;
  font-family: 'Noto Sans M', sans-serif;;
}
`;

export default GlobalStyle;
