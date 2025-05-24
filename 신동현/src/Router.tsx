import { createBrowserRouter } from "react-router-dom";
import { Root, Home, SignUp, SignUpDetail, KakaoLoginLoading, Detail, Write, Update, NotFound, KaKaoForm, EmailForm, MyPageDetail, MyPage, EmailUpdateForm } from "./pages";
import KaKaoUpdateForm from "./pages/MyPage/KakaoUpdateForm";

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
            element: <EmailForm />,
          },
          {
            path: "kakao",
            element: <KaKaoForm />,
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
      },
      {
        path: "/update/:id",
        element: <Update />,
      },
      {
        path: "/mypage/:userNickname",
        element: <MyPage />,
      },
      {
        path: "/mypage/detail",
        element: <MyPageDetail />,
        children: [
          {
            path: "email",
            element: <EmailUpdateForm />,
          },
          {
            path: "kakao",
            element: <KaKaoUpdateForm />,
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
