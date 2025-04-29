import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginApi } from '@/api/auth/auth';

const KakaoLogin = () => {
  const nav = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const loginWithKakao = async () => {
      if (!code) return;

      try {
        const res = await kakaoLoginApi(code);

        if (res.code === 200) {
          console.log('카카오 로그인 성공', res);

          localStorage.setItem('nickname', res.data.nickname);
          nav('/signup/kakao');
        } else {
          console.error('카카오 로그인에 실패했습니다 : ', res.message);
          nav('/signup');
        }
      } catch (error) {
        console.error('카카오 로그인 중 오류 발생', error);
        nav('/signup');
      }
    };
    loginWithKakao();
  }, [nav]);
  return <div>카카오 로그인 처리중...</div>;
};

export default KakaoLogin;
