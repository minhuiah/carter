import { createApp } from "vue";
import { createPinia } from "pinia";
import VueMapboxTs from "vue-mapbox-ts";
import VueAxios from "vue-axios";
import axios from "axios";

import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";
import "mapbox-gl/dist/mapbox-gl.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueMapboxTs);
app.use(VueAxios, axios);

app.mount("#app");
