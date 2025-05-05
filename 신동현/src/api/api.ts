import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const BaseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }
  try {
    const response = await api.post("/auth/reissue", {
      refreshToken,
    });

    if (response.status === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    }
    throw new Error("Failed to refresh access token");
  } catch (error) {
    console.error("Failed to refresh access token", error);
    throw error;
  }
};

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const newHeaders = new AxiosHeaders(config.headers);

  if (accessToken) {
    newHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  if (refreshToken) {
    newHeaders.set("Refresh", `Bearer ${refreshToken}`);
  }

  return {
    ...config,
    headers: newHeaders,
  };
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await getRefreshToken();
        if (!tokens) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
          return Promise.reject(error);
        }
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        originalRequest.headers.Refresh = `Bearer ${tokens.refreshToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error("Failed to refresh access token", error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);
export { BaseUrl, api };




