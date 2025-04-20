import axios from "axios";
import { authService } from "@/api/auth-service";

let isRefreshToken = false;
let requestsToRefresh: Array<(token: string | null) => void> = []; //queue for requests to be retried after token refresh

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default api;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 || !originalRequest._retry) {
      if (!isRefreshToken) {
        originalRequest._retry = true;
        isRefreshToken = true;
      }
      try {
        const { data } = await authService.refreshTokenApi();
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);

        api.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;
        requestsToRefresh.forEach((callback) =>
          callback(data.data.accessToken),
        );

        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      } finally {
        isRefreshToken = false;
        requestsToRefresh = [];
      }
    }
  },
);
