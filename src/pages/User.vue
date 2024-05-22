<template>
  <h1>Пользователь</h1>
  <p>Email: {{ user?.email }}</p>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";

const store = useAuthStore();

const { user } = storeToRefs(store);
</script>
