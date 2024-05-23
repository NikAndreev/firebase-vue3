import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import router from "./router";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import "vuetify/styles";

const pinia = createPinia();

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
  },
});

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
