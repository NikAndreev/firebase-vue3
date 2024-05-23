import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import http from "../http";
import type { Organization } from "../types/Organization";

export const useOrganizationsStore = defineStore("organizations", () => {
  const organizations = ref<Organization[]>([]);
  const organizationsCount = computed(() => organizations.value.length);

  const store = useAuthStore();

  const getOrganizations = async () => {
    try {
      const response = await http({
        method: "get",
        url: `https://vue-authorization-cf9a3-default-rtdb.europe-west1.firebasedatabase.app/organizations.json?auth=${store.tokens?.id}`,
      });
      organizations.value = response.data;
    } catch (error: unknown) {
      throw error;
    }
  };

  return {
    organizations,
    organizationsCount,
    getOrganizations,
  };
});
