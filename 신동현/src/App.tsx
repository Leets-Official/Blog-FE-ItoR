import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, SignUp, SignUpDetail } from "./pages";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUp/detail" element={<SignUpDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App