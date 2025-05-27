import { useEffect } from "react";
import { KakaoRedirect } from "@/api/login/login";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const KakaoLoginLoading = () => {
  const navigate = useNavigate();

  const kakaoLoginMutation = useMutation({
    mutationFn: KakaoRedirect,
    onSuccess: (data) => {
      if (data.code === 401) {
        console.log("Kakao 회원가입 시도");
        localStorage.setItem('name', data.data.nickname);
        localStorage.setItem('profilePicture', data.data.picture);
        localStorage.setItem('kakaoId', data.data.kakaoId);
        navigate("/signUp/detail/kakao", { replace: true });
      } else if (data.code === 200) {
        console.log("Kakao 로그인");
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('nickName', data.data.nickname);
        localStorage.setItem('profilePicture', data.data.profilePicture);
        localStorage.setItem('bio', data.data.introduction);
        localStorage.setItem('isKakaoLogin', "true");
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      console.log("카카오 로그인 실패 : ", error);
    }
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      console.log("Authorization code is not found");
      return;
    }    
    kakaoLoginMutation.mutate(code);
  }, []);

  return (
    <div>로딩중...</div>
  )
};

export default KakaoLoginLoading;

