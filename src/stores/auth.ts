import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref(null);
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
      router.push({ name: "user" });

      console.log(userCredential);
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
      router.push({ name: "user" });

      console.log(userCredential);
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
