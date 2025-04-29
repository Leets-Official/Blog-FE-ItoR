import api from '@/api/axios';

/**
 * @param code Kakao로부터 받은 인증 코드
 */
export const kakaoOAuthLogin = async (
  code: string,
): Promise<{
  nickname: string;
  picture: string;
  responseMessage: string;
}> => {
  const response = await api.get(`/auth/kakao/redirect`, {
    params: { code },
  });

  console.log('카카오 OAuth 응답:', response.data);
  return response.data.data;
};
