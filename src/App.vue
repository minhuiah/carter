<script lang="ts">
import { defineComponent } from "vue";
import rawCarparkData from "@/assets/carparks.json";
import proj4 from "proj4";

interface Carpark {
  lat: number;
  lng: number;
  availableLots: number;
  totalLots: number;
  address: string;
  type: string;
  system: string;
  shortTermParking: string;
  freeParking: string;
  nightParking: boolean;
  carParkDecks: number;
  gantryHeight: number;
}

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
          for (let c of rawCarparkData) {
            if (c.car_park_no === carpark.carpark_number) {
              console.log(carpark);
              let coords = proj4(
                "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs",
                "+proj=longlat +datum=WGS84 +no_defs",
                [c.x_coord, c.y_coord]
              );
              console.log(carpark.carpark_info[0].lots_available, c.address);
              this.carparkData.push({
                lat: coords[0],
                lng: coords[1],
                availableLots: carpark.carpark_info[0].lots_available,
                totalLots: carpark.carpark_info[0].total_lots,
                address: c.address,
                type: c.car_park_type,
                system: c.type_of_parking_system,
                shortTermParking: c.short_term_parking,
                freeParking: c.free_parking,
                nightParking: c.night_parking === "YES",
                carParkDecks: c.car_park_decks,
                gantryHeight: c.gantry_height,
              });
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
      rawCarparkData,
      carparkData: [] as Carpark[],
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
    <mapbox-marker v-for="data in carparkData" :lngLat="[data.lat, data.lng]">
      <mapbox-popup>
        <div>{{ data.address }}</div>
        <div>{{ data.availableLots }} / {{ data.totalLots }}</div>
        <div>carpark decks: {{ data.carParkDecks }}</div>
        <div>free parking: {{ data.freeParking }}</div>
        <div>short term parking: {{ data.shortTermParking }}</div>
        <div>night parking: {{ data.nightParking }}</div>
        <div>gantry height: {{ data.gantryHeight }}m</div>
        <div>type: {{ data.type }}</div>
      </mapbox-popup>
    </mapbox-marker>
  </mapbox-map>
  <!-- <RouterView /> -->
</template>

<style scoped></style>
