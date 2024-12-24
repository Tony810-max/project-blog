import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import "vue3-toastify/dist/index.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import Vue3Toastify from "vue3-toastify";

import router from "./router";
import { createVuetify } from "vuetify/lib/framework.mjs";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.use(Vue3Toastify, {
  autoClose: 2000,
});

app.mount("#app");
