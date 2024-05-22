<template>
  <h1>Авторизация</h1>
  <form @submit.prevent="onSubmit">
    <p>
      <input
        type="email"
        required
        placeholder="Email"
        :disabled="isLoading"
        v-model.trim="email" />
    </p>
    <p>
      <input
        type="password"
        required
        placeholder="Пароль"
        :disabled="isLoading"
        v-model.trim="password" />
    </p>
    <p>
      <button type="submit" :disabled="isLoading">Авторизоваться</button>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const router = useRouter();

const store = useAuthStore();

const onSubmit = async () => {
  isLoading.value = true;

  try {
    await store.signIn(email.value, password.value);
    router.push({ name: "User" });
  } catch {
    isLoading.value = false;
  }
};
</script>
