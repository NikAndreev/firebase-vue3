import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

const router = useRouter();

export const useAuthStore = defineStore("auth", () => {
  const user = ref<null | User>(null);

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      router.push({ name: "User" });
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push({ name: "User" });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    signUp,
    signIn,
  };
});
