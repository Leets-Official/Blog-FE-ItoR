import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, SignUp, SignUpDetail } from "./pages";
import GlobalStyle from "./styles/Global";
import Detail from "./pages/Detail";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUp/detail" element={<SignUpDetail />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App