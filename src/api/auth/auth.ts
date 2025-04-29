import api from '@/api/api';
/**
 * 일반적인 로직
 *
 * 로그인 버튼 클릭 -> 카카오 로그인 페이지로 이동
 * -> 카카오에서 인가코드 발급
 * -> 카카오에서 발급해준 인가코드 를 담아서 백엔드 /auth/kakao/redirect 로 요청
 * 백엔드 -> 카카오에게 인가코드 요청 -> accessToken 발급 -> 백엔드 DB에 저장 -> 서버 전용 토큰 발급
 * -> 프론트에 accessToken, refreshToken 전달
 * -> 토큰 확인(로그인) 후 페이지 리다이렉트
 */

/**
 * 구현 로직
 *
 * 로그인 버튼 클릭
 * -> 카카오로그인 페이지(auth/kakao) 로 이동
 * -> 카카오 로그인 성공 -> oauth/kakao/success?code=xxx
 * -> 프론트 success 페이지가 code 뽑아서
 * -> 백엔드 /auth/kakao/redirect 로 요청
 * -> 백엔드가 accessToken 발급 및 로그인 완료
 * -> /signup/kakao 로 이동해서 추가 회원가입
 */

const kakaoLoginApi = async (code: string) => {
  try {
    const response = await api.get(`/auth/kakao/redirect?code=${code}`);
    return response.data;
  } catch (error) {
    console.log('카카오 로그인 실패', error);
    throw error;
  }
};

export default kakaoLoginApi;
