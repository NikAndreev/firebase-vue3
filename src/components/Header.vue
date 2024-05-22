<template>
  <header class="header">
    <div class="container">
      <ul class="header__list">
        <li v-for="link in links" :key="link.url">
          <RouterLink :to="link.url" active-class="active">{{
            link.text
          }}</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
const links = [
  {
    url: "/sign-up",
    text: "Регистрация",
  },
  {
    url: "/sign-in",
    text: "Авторизация",
  },
  {
    url: "/",
    text: "Домашняя",
  },
  {
    url: "/organizations",
    text: "Организации",
  },
  {
    url: "/user",
    text: "Пользователь",
  },
];
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
