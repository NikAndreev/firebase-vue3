import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { User } from "firebase/auth";

const API_KEY = "AIzaSyD8u7dS90Wpm43exgTNuTSzzMmtgHqJIME";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<null | User>(null);
  const isLoggedIn = computed(() => user.value !== null);

  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }

      const userData = await res.json();
      user.value = userData;
      router.push({ name: "User" });
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }

      const userData = await res.json();
      user.value = userData;
      router.push({ name: "User" });
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    user,
    isLoggedIn,
    signUp,
    signIn,
  };
});
