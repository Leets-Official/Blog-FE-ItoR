import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginApi } from '@/api/auth/auth';
import { useMutation } from '@tanstack/react-query';

const KakaoLogin = () => {
  const nav = useNavigate();

  const kakaoLoginMutation = useMutation({
    mutationFn: kakaoLoginApi,
    onSuccess: (res) => {
      if (res.code === 200) {
        console.log('카카오 로그인 성공', res);
        localStorage.setItem('nickname', res.data.nickname);
        nav('/signup/kakao');
      } else {
        console.error('카카오 로그인 실패:', res.message);
        nav('/signup');
      }
    },
    onError: (error) => {
      console.error('카카오 로그인 중 오류 발생', error);
      nav('/signup');
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) return;

    kakaoLoginMutation.mutate(code);
  }, []);

  return <div>카카오 로그인 처리중...</div>;
};

export default KakaoLogin;
