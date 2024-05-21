<template>
  <h1>Авторизация</h1>
  <form @submit.prevent="onSubmit">
    <p>
      <input type="email" required placeholder="Email" v-model.trim="email" />
    </p>
    <p>
      <input
        type="password"
        required
        placeholder="Пароль"
        v-model.trim="password" />
    </p>
    <p>
      <button type="submit">Авторизоваться</button>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");

const store = useAuthStore();

const onSubmit = () => {
  store.signIn(email.value, password.value);
};
</script>
