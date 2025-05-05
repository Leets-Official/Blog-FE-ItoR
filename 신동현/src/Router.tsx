import { createBrowserRouter } from "react-router-dom";
import { Root, Home, SignUp, SignUpDetail, Mypage, KakaoLoginLoading, Detail, Write, NotFound } from "./pages";
import Update from "./pages/Update";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/signUp/detail",
        element: <SignUpDetail />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/update/:id",
        element: <Update />,  
      },
      {
        path: "/mypage",
        element: <Mypage />,
      },
      {
        path: "/oauth/kakao/success",
        element: <KakaoLoginLoading />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default Router;
