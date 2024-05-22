<template>
  <h1>Пользователь</h1>
  <p>Email: {{ user?.email }}</p>
  <p>
    <button class="exit" @click="onExit">Выйти</button>
  </p>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";

const store = useAuthStore();

const { user } = storeToRefs(store);

const onExit = async () => {};
</script>

<style scoped>
.exit {
  padding: 0;
  border: none;
  outline: none;
  background: none;
  color: red;
  text-decoration: underline;
  cursor: pointer;
}
</style>
