import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { User } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref<null | User>(null);
  const auth = getAuth();
  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      isAuthenticated.value = true;
      user.value = userCredential.user;
      router.push({ name: "user" });
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      isAuthenticated.value = true;
      user.value = userCredential.user;
      router.push({ name: "user" });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isAuthenticated,
    user,
    signUp,
    signIn,
  };
});
