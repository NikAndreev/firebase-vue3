import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import http from "../http";
import type { Tokens } from "../types/Tokens";

const API_KEY = import.meta.env.VITE_API_KEY;

export const useAuthStore = defineStore("auth", () => {
  const tokens = ref<null | Tokens>(null);
  const isLoggedIn = computed(() => tokens.value !== null);

  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    return auth(email, password, "signUp");
  };

  const signIn = async (email: string, password: string) => {
    return auth(email, password, "signInWithPassword");
  };

  const auth = async (email: string, password: string, type: string) => {
    try {
      const response = await http({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${API_KEY}`,
        data: {
          email,
          password,
          returnSecureToken: true,
        },
      });
      tokens.value = {
        id: response.data.idToken,
        refresh: response.data.refreshToken,
      };
      localStorage.setItem("tokens", JSON.stringify(tokens.value));
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
      throw error;
    }
  };

  const checkUser = () => {
    const LSTokens = localStorage.getItem("tokens");

    if (LSTokens) {
      tokens.value = JSON.parse(LSTokens);
    }
  };

  const logout = async () => {
    tokens.value = null;
    localStorage.removeItem("tokens");
    router.push({ name: "SignIn" });
  };

  const refreshTokens = async () => {
    try {
      const response = await http({
        method: "post",
        url: `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
        data: {
          grant_type: "refresh_token",
          refresh_token: tokens.value?.refresh,
        },
      });
      tokens.value = {
        id: response.data.id_token,
        refresh: response.data.refresh_token,
      };
      localStorage.setItem("tokens", JSON.stringify(tokens.value));
    } catch (error: unknown) {
      logout();
    }
  };

  return {
    tokens,
    isLoggedIn,
    signUp,
    signIn,
    checkUser,
    logout,
    refreshTokens,
  };
});
