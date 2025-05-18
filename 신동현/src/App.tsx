import {RouterProvider} from "react-router-dom";
import router from "./Router";
import GlobalStyle from "./styles/Global";

function App() {

  return (
    <>
    <GlobalStyle />
    <RouterProvider router={router} />
    </>
  );
}

export default App