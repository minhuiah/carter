import { createApp } from "vue";
import { createPinia } from "pinia";
import VueMapboxTs from "vue-mapbox-ts";
import VueAxios from "vue-axios";
import axios from "axios";

import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCarparkStore } from "./stores/Carparks";
import { useRentalStore } from "./stores/Rental";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueMapboxTs);
app.use(VueAxios, axios);

app.mount("#carter");

const carpark = useCarparkStore();
carpark.get();

const rentals = useRentalStore();
rentals.get();
