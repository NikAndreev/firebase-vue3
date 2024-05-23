import axios from "axios";
import { useAuthStore } from "../stores/auth";

const http = axios.create();

/**
 * Если токен доступа передаётся в заголовках, нужно настроить перехватчик на запрос и установить его там.
 */

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // чтобы не зациклиться при повторном запросе
      const store = useAuthStore();

      try {
        await store.refreshTokens();

        // Обновляем токен в originalRequest

        // Повторяем запрос с обновленными токенами
        // return http(originalRequest);
      } catch {
        store.logout();
      }
    }

    return Promise.reject(error);
  }
);

export default http;
