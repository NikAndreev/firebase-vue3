import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as $signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<null | User>(null);
  const isLoggedIn = computed(() => user.value !== null);

  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
      router.push({ name: "User" });
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
      router.push({ name: "User" });
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const signOut = async () => {
    try {
      await $signOut(auth);
      user.value = null;
      router.push({ name: "SignIn" });
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    user,
    isLoggedIn,
    signUp,
    signIn,
    signOut,
  };
});
