import api from '@/api/axios';
import { SignupSchema } from '@/schema/auth';

export const signupAPI = async (
  signupData: SignupSchema & {
    profilePicture?: string;
    isKakaoLogin?: boolean;
    kakaoId?: number;
  },
) => {
  try {
    const isKakaoLogin = signupData.isKakaoLogin === true;

    const payload = {
      email: signupData.email,
      name: signupData.name,
      birthDate: signupData.birthDate,
      nickname: signupData.nickname,
      profilePicture: signupData.profilePicture ?? '',
      introduction: signupData.introduction ?? '',
      ...(isKakaoLogin
        ? {
            kakaoId: signupData.kakaoId,
          }
        : {
            password: signupData.password,
          }),
    };

    const endpoint = isKakaoLogin ? '/auth/register-oauth' : '/auth/register';

    const response = await api.post(endpoint, payload);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      if (status === 409) {
        throw new Error('이미 가입된 이메일입니다.');
      }
      throw new Error(error.response.data.message || '회원가입에 실패했습니다.');
    } else {
      throw new Error('네트워크 오류가 발생했습니다.');
    }
  }
};
