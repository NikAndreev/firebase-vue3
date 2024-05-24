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
    <v-avatar :image="photo" color="grey" size="150" class="mb-4"></v-avatar>
    <v-file-input
      label="Загрузить изображение"
      accept="image/*"
      hide-details
      prepend-icon=""
      @change="onFileChange"
      @click:clear="onClear"
      class="mb-4">
    </v-file-input>
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
import { useStorageStore } from "../stores/storage";
import Loader from "../components/Loader.vue";

const name = ref("");
const photo = ref("");
const photoFile = ref<null | File>(null);
const isLoading = ref(false);
const isPending = ref(false);

const rules = {
  required: (value: string) => !!value || "Поле обязательное для заполнения",
};

const isValid = computed(() => !!name.value);

const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const storageStore = useStorageStore();

const onSubmit = async () => {
  if (!isValid.value) {
    return;
  }

  isPending.value = true;

  let newPhotoUrl = "";

  if (!!photoFile.value && photo.value !== user.value?.photoUrl) {
    try {
      newPhotoUrl = await storageStore.uploadFile(photoFile.value);
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  }

  try {
    await userStore.updateUser(name.value, newPhotoUrl);
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
  photo.value = user.value?.photoUrl ?? "";
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const url = e.target?.result;

      if (typeof url === "string") {
        photo.value = url;
        photoFile.value = file;
      }
    };
  }
};

const onClear = () => {
  photo.value = user.value?.photoUrl ?? "";
  photoFile.value = null;
};

onMounted(async () => {
  isLoading.value = true;

  try {
    await userStore.getUser();
    reset();
  } catch (error: unknown) {
    if (error instanceof Error) alert(error.message);
  } finally {
    isLoading.value = false;
  }
});
</script>
