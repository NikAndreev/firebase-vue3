import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import Home from "../pages/Home.vue";
import User from "../pages/User.vue";

const routes = [
  {
    path: "/sign-up",
    name: "signUp",
    component: SignUp,
    meta: { requiresAuth: false },
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: SignIn,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/user",
    name: "user",
    component: User,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
