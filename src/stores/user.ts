import { ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import http from "../http";
import type { User } from "../types/User";

const API_KEY = import.meta.env.VITE_API_KEY;

export const useUserStore = defineStore("user", () => {
  const user = ref<null | User>(null);

  const getUser = async () => {
    try {
      const store = useAuthStore();
      const response = await http({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        data: {
          idToken: store.tokens?.id,
        },
      });
      user.value = response.data.users[0];
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    user,
    getUser,
  };
});
