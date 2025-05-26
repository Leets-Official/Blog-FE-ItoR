import api from '@/api/api';

/**
 * @param code Kakao로부터 받은 인증 코드
 */
export const kakaoOAuthLogin = async (
  code: string,
): Promise<{
  code: number;
  accessToken?: string;
  nickname?: string;
  profilePicture?: string;
  responseMessage: string;
}> => {
  const response = await api.get(`/auth/kakao/redirect`, {
    params: { code },
  });

  const result = response.data;

  console.log('카카오 OAuth 응답:', result);

  const {
    accessToken,
    refreshToken,
    nickname,
    introduction,
    profilePicture: profilePicture,
  } = result.data;

  // localStorage에 저장
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('profilePicture', profilePicture);
  localStorage.setItem('introduction', introduction);
  localStorage.setItem('isKakaoLogin', 'true');

  return {
    code: result.code,
    accessToken: result.data?.accessToken,
    nickname: result.data?.nickname,
    profilePicture: result.data?.picture,
    responseMessage: result.data?.responseMessage,
  };
};
