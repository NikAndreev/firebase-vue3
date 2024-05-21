import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const auth = getAuth();
  const router = useRouter();

  const user = ref<null | User>(null);

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });

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
