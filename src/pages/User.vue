<template>
  <h1 class="text-h4 mb-4">Пользователь</h1>
  <Loader v-if="isLoading" />
  <v-form v-else :disabled="isPending" @submit.prevent="onSubmit">
    <div class="mb-4">
      Email:
      <a :href="`mailto:${user?.email}`" target="_blank" class="text-primary">
        {{ user?.email }}
      </a>
    </div>
    <v-text-field
      type="text"
      label="Имя"
      hide-details
      :rules="[rules.required]"
      required
      class="mb-4"
      v-model.trim="name">
    </v-text-field>
    <v-btn color="primary" type="submit" :disabled="isPending">
      Сохранить
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import Loader from "../components/Loader.vue";

const name = ref("");
const isLoading = ref(false);
const isPending = ref(false);

const rules = {
  required: (value: string) => !!value || "Поле обязательное для заполнения",
};

const isValid = computed(() => !!name.value);

const store = useUserStore();

const { user } = storeToRefs(store);

const onSubmit = async () => {
  if (!isValid.value) {
    return;
  }

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
