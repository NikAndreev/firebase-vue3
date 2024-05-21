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
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
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
