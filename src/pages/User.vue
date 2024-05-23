<template>
  <h1>Пользователь</h1>
  <Loader v-if="isLoading" />
  <template v-else>
    <form @submit.prevent="onSubmit">
      <p>Email: {{ user?.email }}</p>
      <p>
        <input
          type="text"
          required
          placeholder="Имя"
          :disabled="isPending"
          v-model.trim="name" />
      </p>
      <p>
        <button type="submit" :disabled="isPending">Сохранить</button>
      </p>
    </form>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import Loader from "../components/Loader.vue";

const name = ref("");
const isLoading = ref(false);
const isPending = ref(false);

const store = useUserStore();

const { user } = storeToRefs(store);

const onSubmit = async () => {
  isPending.value = true;

  try {
    await store.updateUser(name.value);
    reset();
    alert("Информация о пользователе обновлена!");
  } catch (error: unknown) {
    if (error instanceof Error) alert(error.message);
  } finally {
    isPending.value = false;
  }
};

const reset = () => {
  name.value = user.value?.displayName ?? "";
};

onMounted(async () => {
  isLoading.value = true;

  try {
    await store.getUser();
    reset();
  } catch (error: unknown) {
    if (error instanceof Error) alert(error.message);
  } finally {
    isLoading.value = false;
  }
});
</script>
