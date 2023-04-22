import "./infra/styles/index.scss";
import {createApp} from "vue";
import App from "/@/App.vue";
const _app = createApp(App);

import { createPinia } from "pinia";
_app.use(createPinia());

import router from "./infra/router";
_app.use(router);

_app.mount("#app");
