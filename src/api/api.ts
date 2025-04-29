import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// 인스턴스
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 리프레쉬 토큰 요청
const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('RefreshToken이 없습니다.');

  try {
    const resposnse = await api.post('/auth/reissue', { refreshToken });
    if (resposnse.data.code === 200) {
      const { accessToken, refreshToken: newRefreshToken } = resposnse.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    }
    throw new Error('RefreshToken이 만료되었습니다.');
  } catch (error) {
    console.error('RefreshToken 요청 실패:', error);
    throw error;
  }
};

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('요청 에러:', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정(accessToken 만료 시 리프레쉬 토큰 요청)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest.url?.includes('/auth/login')) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await getRefreshToken(); // 리프레시 요청
        // 새 accessToken으로 헤더 교체
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('리프레쉬 토큰 요청 실패:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
