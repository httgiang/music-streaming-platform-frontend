import axios from "axios";

let isRefreshToken = false;
let requestsToRefresh: Array<(token: string | null) => void> = [];

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (!isRefreshToken) {
//         originalRequest._retry = true;
//         isRefreshToken = true;
//       }
//       try {
//         const { data } = await api.post("/auth/refresh-token", {
//           withCredentials: true,
//         });

//         setAuthToken(data.data.accessToken);
//         requestsToRefresh.forEach((callback) =>
//           callback(data.data.accessToken),
//         );
//         requestsToRefresh = [];
//         return api(originalRequest);
//       } catch (error) {
//         return Promise.reject(error);
//       } finally {
//         isRefreshToken = false;
//         requestsToRefresh = [];
//       }
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
