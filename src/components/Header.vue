<template>
  <v-app-bar app color="primary">
    <v-container style="max-width: 700px">
      <div class="d-flex align-center">
        <v-toolbar-title>Firebase Vue3</v-toolbar-title>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </div>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" location="left" temporary>
    <v-list>
      <template v-if="isLoggedIn">
        <v-list-item value="/">
          <v-list-item-title>
            <router-link to="/" class="text-primary"> Домашняя </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item value="/organizations">
          <v-list-item-title>
            <router-link to="/organizations" class="text-primary">
              Организации
            </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item value="/user">
          <v-list-item-title>
            <router-link to="/user" class="text-primary">
              Пользователь
            </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item value="/sign-in">
          <v-list-item-title>
            <router-link
              to="/sign-in"
              class="text-primary"
              @click.prevent="store.logout">
              Выход
            </router-link>
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item value="/sign-up">
          <v-list-item-title>
            <router-link to="/sign-up" class="text-primary">
              Регистрация
            </router-link>
          </v-list-item-title>
        </v-list-item>
        <v-list-item value="/sign-in">
          <v-list-item-title>
            <router-link to="/sign-in" class="text-primary">
              Авторизация
            </router-link>
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";

const drawer = ref(false);

const store = useAuthStore();

const { isLoggedIn } = storeToRefs(store);
</script>
