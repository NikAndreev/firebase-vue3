import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import App from "./App.vue";
import router from "./router";

import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyD8u7dS90Wpm43exgTNuTSzzMmtgHqJIME",
  authDomain: "vue-authorization-cf9a3.firebaseapp.com",
  projectId: "vue-authorization-cf9a3",
  storageBucket: "vue-authorization-cf9a3.appspot.com",
  messagingSenderId: "1002683187874",
  appId: "1:1002683187874:web:4659490203ec3aa15b0dfb",
};

initializeApp(firebaseConfig);

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
