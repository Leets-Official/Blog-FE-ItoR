import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('저장된 refreshToken이 없습니다.');

  try {
    const response = await api.post('/auth/reissue', {
      refreshToken,
    });
    console.log('리프레시 응답:', response);
    if (response.data.code === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    }
    throw new Error('새로운 refreshToken을 발급받지 못했습니다.');
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
};

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error?.response?.data?.message || '';

    // 만료되었거나 유효하지 않은 토큰일 경우 처리
    const isTokenExpired =
      (error.response?.status === 401 || error.response?.status === 500) &&
      message.includes('JWT expired');

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      localStorage.removeItem('accessToken');

      try {
        const { accessToken } = await getRefreshToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('재발급 실패: ', refreshError);
        localStorage.clear();
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

export default api;
