<template>
  <h1>Вход</h1>
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
      <button type="submit">Войти</button>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");

const auth = getAuth();

const onSubmit = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    console.log(userCredential);
  } catch (error) {
    console.log(error);
  }
};
</script>
