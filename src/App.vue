<script lang="ts">
import { defineComponent } from "vue";
import carparkData from "@/assets/carparks.json";
import proj4 from "proj4";

export default defineComponent({
  mounted() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation.long = position.coords.longitude;
        this.currentLocation.lat = position.coords.latitude;
        console.log(position.coords);
      });
    } else {
      /* geolocation IS NOT available */
    }
    this.axios
      .get("https://api.data.gov.sg/v1/transport/carpark-availability")
      .then((data) => {
        for (let carpark of data.data.items[0].carpark_data) {
          for (let c of carparkData) {
            if (c.car_park_no === carpark.carpark_number) {
              console.log(carpark.carpark_info[0].lots_available, c.address);
            }
          }
        }
      });
  },
  data() {
    return {
      currentLocation: {
        long: 103.852119,
        lat: 1.296568,
      },
      carparkData,
    };
  },
  computed: {
    centerLocation() {
      return [this.currentLocation.long, this.currentLocation.lat];
    },
  },
});
</script>

<template>
  <!-- <div>
    <div v-for="data in carparkData">{{ data.car_park_no }}</div>
  </div> -->
  <mapbox-map
    style="width: 100vw; height: 100vh"
    mapStyle="navigation-day-v1"
    :center="centerLocation"
    :zoom="16"
  >
    <mapbox-geolocate-control />
    <mapbox-navigation-control position="bottom-left" />
  </mapbox-map>
  <!-- <RouterView /> -->
</template>

<style scoped></style>
