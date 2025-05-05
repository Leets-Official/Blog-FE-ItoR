import { createBrowserRouter } from "react-router-dom";
import { Root, Home, SignUp, SignUpDetail, Mypage, KakaoLoginLoading, Detail, Write, NotFound } from "./pages";

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
        children: [
          {
            path: "/signUp/detail",
            element: <SignUpDetail />,
          },
        ],
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
