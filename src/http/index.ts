import axios from "axios";
import { useAuthStore } from "../stores/auth";

const http = axios.create();

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) useAuthStore().refreshTokens();

    return Promise.reject(error);
  }
);

export default http;
