<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <ul class="header__list">
          <li>
            <RouterLink to="/sign-up">Регистрация</RouterLink>
          </li>
          <li>
            <RouterLink to="/sign-in">Авторизация</RouterLink>
          </li>
          <li>
            <RouterLink to="/">Домашняя</RouterLink>
          </li>
          <li>
            <RouterLink to="/user">Пользователь</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header__inner {
  display: flex;
  justify-content: flex-end;
}

.header__list {
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
