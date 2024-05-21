import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8u7dS90Wpm43exgTNuTSzzMmtgHqJIME",
  authDomain: "vue-authorization-cf9a3.firebaseapp.com",
  projectId: "vue-authorization-cf9a3",
  storageBucket: "vue-authorization-cf9a3.appspot.com",
  messagingSenderId: "1002683187874",
  appId: "1:1002683187874:web:4659490203ec3aa15b0dfb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
