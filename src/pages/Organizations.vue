<template>
  <h1>Организации</h1>
  <Loader v-if="isLoading" />
  <template v-else>
    <ul>
      <li v-for="organization in organizations" :key="organization.id">
        {{ organization.name }}
      </li>
    </ul>
    <p>Общее количество: {{ organizationsCount }}</p>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useOrganizationsStore } from "../stores/organizations";
import Loader from "../components/Loader.vue";

const isLoading = ref(false);

const store = useOrganizationsStore();

const { organizations, organizationsCount } = storeToRefs(store);

onMounted(async () => {
  isLoading.value = true;

  try {
    await store.getOrganizations();
  } catch (error: unknown) {
    if (error instanceof Error) alert(error.message);
  } finally {
    isLoading.value = false;
  }
});
</script>
