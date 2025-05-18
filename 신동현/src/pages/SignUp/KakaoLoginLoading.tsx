import { useEffect } from "react";
import { KakaoRedirect } from "@/api/login/login";
import { useNavigate } from "react-router-dom";
const KakaoLoginLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      console.log(code);
      if (!code) {
        console.log("Authorization code is not found");
        return;
      }

      try {
        const response = await KakaoRedirect(code);
        console.log(response.data);
        if (response.code === 401) {
          localStorage.setItem('name', response.data.nickname);
          localStorage.setItem('profilePicture', response.data.picture);
          localStorage.setItem('kakaoId', response.data.kakaoId);
          navigate("/signUp/detail/kakao", { replace: true });
        } else if (response.code === 200) {
          console.log(response.data);
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('nickName', response.data.nickname);
          localStorage.setItem('profilePicture', response.data.profilePicture);
          localStorage.setItem('bio', response.data.introduction);
          navigate("/", { replace: true });
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
    <div>로딩중...</div>
  )
};

export default KakaoLoginLoading;

