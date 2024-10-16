import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshToken } from './apis';
import API_URL from './ApiUrl';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

let isRefreshing = false;
let pendingRequests: Array<{
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: any) => void;
}> = [];

// Interceptor để thêm token vào header
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor để xử lý token refresh
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Nếu token hết hạn (mã 401)
    if (error.response?.status === 421 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, hãy chờ cho đến khi có token mới
        return new Promise<string>((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const { data } = await refreshToken(); // Hàm làm mới token
        localStorage.setItem('access_token', data.access_token); // Cập nhật token mới
        console.log(data)

        // Xử lý các yêu cầu đã xếp hàng
        pendingRequests.forEach((req) => req.resolve(data.access_token));
        pendingRequests = [];

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
        }
        return axiosInstance(originalRequest);
      } catch (err) {
        pendingRequests.forEach((req) => req.reject(err));
        pendingRequests = [];
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;