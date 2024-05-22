<template>
  <div class="wrapper">
    <Header />
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "./stores/auth";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const store = useAuthStore();

store.checkUser();
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 1 auto;
}
</style>
