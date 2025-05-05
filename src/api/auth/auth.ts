import api from '@/api/api';
import { emailSignup, kakaoSignup } from '@/types/signup';

const PATH = '/auth';

const kakaoLoginApi = async (code: string) => {
  try {
    const response = await api.get(`${PATH}/kakao/redirect?code=${code}`);
    return response.data;
  } catch (error) {
    console.log('카카오 로그인 실패', error);
    throw error;
  }
};

const kakaoSignupApi = async (data: kakaoSignup) => {
  try {
    const response = await api.post(`${PATH}/register-oauth`, data);
    return response.data;
  } catch (error) {
    console.log('카카오 회원가입 실패', error);
    throw error;
  }
};

const signupApi = async (data: emailSignup) => {
  try {
    const response = await api.post(`${PATH}/register`, data);
    return response.data;
  } catch (error) {
    console.log('자체 회원가입 실패', error);
    throw error;
  }
};

const loginApi = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post(`${PATH}/login`, data);
    return response.data;
  } catch (error) {
    console.log('자체 로그인 실패', error);
    throw error;
  }
};
export { kakaoLoginApi, kakaoSignupApi, signupApi, loginApi };
