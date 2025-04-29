import { useEffect } from "react";
import { KakaoRedirect } from "@/api/login";
import { useNavigate } from "react-router-dom";
const KakaoLoginLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const code = new URL(window.location.href).searchParams.get("code");

      if (!code) {
        console.log("Authorization code is not found");
        return;
      }

      try {
        const response = await KakaoRedirect(code);
        console.log(response);
        if ( response.code === 200 ) {
          if (response.message === "OAuth2 회원가입이 필요합니다.") {
            localStorage.setItem('name', response.data.nickname);
            localStorage.setItem('profilePicture', response.data.picture);
            window.location.href = "/signUp/detail?type=kakao";
          } else {
            console.log(response.data);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('nickname', response.data.nickname);
            localStorage.setItem('profilePicture', response.data.profilePicture);
            window.location.href = "/";
          }
        } else {
          console.log("카카오 로그인 실패 : ", response.message);
        }
      } catch (error: any) {
        console.log("카카오 로그인 실패 : ", error);
      }
    };

    handleKakaoLogin();
  }, []);

  return (
    <>
    </>
  )
};

export default KakaoLoginLoading;

