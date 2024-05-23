<template>
  <v-form @submit.prevent="onSubmit" :disabled="isLoading">
    <v-text-field
      type="email"
      label="Email"
      hide-details
      :rules="[rules.required]"
      required
      class="mb-4"
      v-model.trim="email">
    </v-text-field>
    <v-text-field
      type="password"
      label="Пароль"
      hide-details
      :rules="[rules.required]"
      required
      class="mb-4"
      v-model.trim="password">
    </v-text-field>
    <v-btn color="primary" type="submit" :disabled="isLoading">
      Отправить
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: "signIn",
  },
});

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const rules = {
  required: (value: string) => !!value || "Поле обязательное для заполнения",
};

const isValid = computed(() => !!email.value && !!password.value);

const router = useRouter();

const store = useAuthStore();

const onSubmit = async () => {
  if (!isValid.value) {
    return;
  }

  isLoading.value = true;

  try {
    props.type === "signIn"
      ? await store.signIn(email.value, password.value)
      : await store.signUp(email.value, password.value);
    router.push({ name: "User" });
  } catch (error: unknown) {
    if (error instanceof Error) alert(error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
