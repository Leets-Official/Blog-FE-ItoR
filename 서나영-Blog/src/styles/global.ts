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
  font-family: 'Noto Sans M', sans-serif;
  line-height: 160%;
  font-weight: 400;
}

input {
  font-family: "Noto Sans L";
  font-weight: 300;
  letter-spacing: -0.07px;
}

button { 
  font-family: "Noto Sans R";
  font-weight: 400;
  letter-spacing: -0.07px;
}

h1 {
  font-family: "Noto Sans M";
  font-size: 32px; 
  font-weight: 500;
  line-height: 160%; 
  color: #000; 
}

label {
  font-weight: 300;
  letter-spacing: -0.07px;
  font-family: 'Noto Sans L';
}
`;

export default GlobalStyle;
