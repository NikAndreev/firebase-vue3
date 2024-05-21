import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";

const routes = [
  {
    path: "/sign-up",
    name: "signUp",
    component: SignUp,
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
