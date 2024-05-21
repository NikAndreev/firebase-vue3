<template>
  <h1>Регистрация</h1>
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
      <button type="submit" :disabled="isLoading">Зарегистрироваться</button>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const store = useAuthStore();

const onSubmit = async () => {
  isLoading.value = true;
  await store.signUp(email.value, password.value);
  isLoading.value = false;
};
</script>
