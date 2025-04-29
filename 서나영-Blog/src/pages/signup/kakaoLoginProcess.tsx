import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoOAuthLogin } from '@/api/auth/kakaoOAuthLoginAPI';

const KakaoLoginProcess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processKakaoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        alert('카카오 인증 코드가 없습니다.');
        return;
      }

      try {
        const userInfo = await kakaoOAuthLogin(code);

        if (userInfo.responseMessage === 'OAuth2 회원가입이 필요합니다.') {
          navigate('/signup', {
            state: {
              isKakaoLogin: true,
              name: userInfo.nickname,
              profilePicture: userInfo.picture,
            },
          });
        } else {
          navigate('/');
        }
      } catch (error: any) {
        console.error('카카오 로그인 실패:', error.response?.data || error);
        alert('카카오 로그인 중 문제가 발생했습니다.');
        navigate('/signup/select');
      }
    };

    processKakaoLogin();
  }, [navigate]);

  return (
    <div
      style={{
        width: '100%',
        padding: '80px',
        textAlign: 'center',
        color: '#555',
      }}
    >
      카카오 로그인 처리 중입니다...
    </div>
  );
};

export default KakaoLoginProcess;
