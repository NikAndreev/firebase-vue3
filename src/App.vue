<template>
  <v-app>
    <Header />
    <v-main>
      <v-container style="max-width: 700px">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from "./stores/auth";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const store = useAuthStore();

store.checkUser();
</script>
