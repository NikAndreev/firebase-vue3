<template>
  <h1>Пользователь</h1>
  <Loader v-if="isLoading" />
  <template v-else>
    <p>Email: {{ user?.email }}</p>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import Loader from "../components/Loader.vue";

const isLoading = ref(false);

const store = useUserStore();

const { user } = storeToRefs(store);

onMounted(async () => {
  isLoading.value = true;
  await store.getUser();
  isLoading.value = false;
});
</script>
