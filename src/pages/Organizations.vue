<template>
  <h1 class="text-h4 mb-4">Организации</h1>
  <Loader v-if="isLoading" />
  <template v-else>
    <v-table v-if="organizations.length">
      <thead>
        <tr>
          <th>#</th>
          <th>НАЗВАНИЕ</th>
          <th>ДАТА СОЗДАНИЯ</th>
          <th>ДИРЕКТОР</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="organization in organizations" :key="organization.id">
          <td>
            {{ organization.id }}
          </td>
          <td>
            {{ organization.name }}
          </td>
          <td>
            {{ new Date(organization.createdAt).toLocaleString() }}
          </td>
          <td>
            {{ organization.director }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-h5" v-else>Организаций пока нет.</div>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useOrganizationsStore } from "../stores/organizations";
import Loader from "../components/Loader.vue";

const isLoading = ref(false);

const store = useOrganizationsStore();

const { organizations } = storeToRefs(store);

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
