import { createBrowserRouter } from "react-router-dom";
import { Root, Home, SignUp, SignUpDetail, Mypage, KakaoLoginLoading, Detail, Write, WriteForm, Update, NotFound, UpdateForm, KaKaoForm, EmailForm } from "./pages";

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
        children: [
          {
            path: "email",
            element: <EmailForm/>,
          },
          {
            path: "kakao",
            element: <KaKaoForm/>,
          },          
        ]
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/write",
        element: <Write />,
        children: [
          {
            path: "",
            element: <WriteForm />,
          },
        ]
      },
      {
        path: "/update/:id",
        element: <Update />,
        children: [
          {
            path: "",
            element: <UpdateForm />,
          },
        ]
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
