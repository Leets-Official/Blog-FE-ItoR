import { createBrowserRouter } from "react-router-dom";
import { Root, Home, SignUp, SignUpDetail, KakaoLoginLoading, Detail, Write, WriteForm, Update, NotFound, UpdateForm, KaKaoForm, EmailForm, MyPageDetail, MyPage } from "./pages";

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
        path: "/mypage/:userNickname",
        element: <MyPage />,
        children: [
          {
            path: "detail",
            element: <MyPageDetail />,
          }, 
        ]
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
