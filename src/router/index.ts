import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import Home from "../pages/Home.vue";
import User from "../pages/User.vue";

import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
    meta: { requiresAuth: false },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const store = useAuthStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return { name: "SignIn" };
  }

  if (!to.meta.requiresAuth && store.isLoggedIn) {
    return false;
  }
});

export default router;
