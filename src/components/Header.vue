<template>
  <header class="header">
    <div class="container">
      <ul class="header__list">
        <template v-if="isLoggedIn">
          <li>
            <RouterLink to="/" active-class="active">Домашняя</RouterLink>
          </li>
          <li>
            <RouterLink to="/organizations" active-class="active"
              >Организации</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/user" active-class="active"
              >Пользователь</RouterLink
            >
          </li>
        </template>
        <template v-else>
          <li>
            <RouterLink to="/sign-up" active-class="active"
              >Регистрация</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/sign-in" active-class="active"
              >Авторизация</RouterLink
            >
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";

const store = useAuthStore();

const { isLoggedIn } = storeToRefs(store);
</script>

<style scoped>
.header {
  padding: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header__list {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

a:hover,
a.active {
  text-decoration: underline;
}
</style>
