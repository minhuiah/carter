<script lang="ts">
import { defineComponent } from "vue";
import rawCarparkData from "@/assets/carparks.json";
import proj4 from "proj4";
import { Icon } from "@vicons/utils";
import {
  MapMarkerAlt,
  Car,
  LevelUpAlt,
  ArrowsAltV,
  LocationArrow,
} from "@vicons/fa";

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
  components: {
    Icon,
    MapMarkerAlt,
    Car,
    LevelUpAlt,
    ArrowsAltV,
    LocationArrow,
  },
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
              // console.log(carpark);
              let coords = proj4(
                "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs",
                "+proj=longlat +datum=WGS84 +no_defs",
                [c.x_coord, c.y_coord]
              );
              // console.log(carpark.carpark_info[0].lots_available, c.address);
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
  methods: {
    displayCarparkDetail(carpark: Carpark) {
      this.selectedCarpark = carpark;
    },
    mapLoaded() {
      // TODO: Prevent map pop-ups from appearing before map is loaded
    },
    goToGoogleMaps() {
      window.open(
        `https://www.google.com/maps?daddr=${this.selectedCarpark.lng},${this.selectedCarpark.lat}`
      );
    },
  },
  data() {
    return {
      currentLocation: {
        long: 103.852119,
        lat: 1.296568,
      },
      rawCarparkData,
      carparkData: [] as Carpark[],
      selectedCarpark: {} as Carpark,
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
  <div
    style="
      width: 100vw;
      height: 100vh;
      position: relative;
      display: flex;
      align-items: flex-start;
    "
  >
    <div
      style="
        position: absolute;
        z-index: 10;
        margin: 5rem;
        width: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background-color: #fefefe;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 8px 10px -6px rgba(0, 0, 0, 0.1);
      "
    >
      <div class="panel-header">Carter</div>
      hello world
      <div
        class="carpark-info"
        v-show="selectedCarpark && Object.keys(selectedCarpark).length !== 0"
      >
        <div class="carpark-row">
          <Icon>
            <MapMarkerAlt />
          </Icon>
          <div class="carpark-detail">{{ selectedCarpark.address }}</div>
        </div>
        <button class="carpark-btn">
          <Icon><LocationArrow /></Icon>
          <span
            @click="goToGoogleMaps()"
            style="margin-left: 0.5rem; font-weight: bold"
            >Get Directions</span
          >
        </button>
        <div class="carpark-row">
          <Icon>
            <Car />
          </Icon>
          <div class="carpark-detail">
            <div
              style="
                padding: 0 2px 0 6px;
                background-color: green;
                color: white;
                font-weight: bold;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                font-size: 13px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              {{ selectedCarpark.availableLots }}
            </div>
            <div
              style="
                padding: 0px 6px;
                background-color: #2e42a8;
                color: white;
                font-weight: bold;
                font-size: 13px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              /
            </div>
            <div
              style="
                padding: 0 6px 0 0;
                background-color: #2e42a8;
                color: white;
                font-weight: bold;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                font-size: 13px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              {{ selectedCarpark.totalLots }}
            </div>
          </div>
        </div>
        <div class="carpark-row">
          <Icon>
            <LevelUpAlt />
          </Icon>
          <div class="carpark-detail">
            Decks: {{ selectedCarpark.carParkDecks }}
          </div>
        </div>
        <div class="carpark-row">
          <Icon>
            <ArrowsAltV />
          </Icon>
          <div class="carpark-detail">
            Height Restrictions: {{ selectedCarpark.gantryHeight }} m
          </div>
        </div>
        <div>free parking: {{ selectedCarpark.freeParking }}</div>
        <div>short term parking: {{ selectedCarpark.shortTermParking }}</div>
        <div>night parking: {{ selectedCarpark.nightParking }}</div>
        <div>gantry height: {{ selectedCarpark.gantryHeight }}m</div>
        <div>type: {{ selectedCarpark.type }}</div>
      </div>
    </div>
    <mapbox-map
      style="width: 100vw; height: 100vh; z-index: 0"
      mapStyle="navigation-night-v1"
      :center="centerLocation"
      :zoom="16"
      accessToken="pk.eyJ1IjoiMWhpdW9uaiIsImEiOiJjbDlhcnNha2MwbWRtM3BxdDJ1d2psNTF5In0.3I_UAtOyTVSwLev2yEua8w"
      :load="mapLoaded()"
    >
      <mapbox-geolocate-control />
      <mapbox-navigation-control position="bottom-left" />
      <mapbox-marker
        @click="displayCarparkDetail(data)"
        v-for="data in carparkData"
        :lngLat="[data.lat, data.lng]"
      >
        <template v-slot:icon>
          <div class="carpark-icon">
            {{ data.availableLots }}
          </div>
        </template>
      </mapbox-marker>
    </mapbox-map>
  </div>
</template>

<style scoped>
.panel-header {
  background-color: #2e42a8;
  color: #ffffff;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  width: 100%;
  text-align: center;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}
.carpark-icon {
  height: 2rem;
  width: 2rem;
  border-radius: 4px;
  border: 2px solid #ffffff;
  color: #ffffff;
  font-weight: bold;
  background-color: #2e42a8;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: 0.2s all;
}

.carpark-icon:hover {
  background-color: #ffffff;
  color: #2e42a8;
  border: 2px solid #2e42a8;
}
.carpark-info {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
}
.carpark-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
}
.carpark-detail {
  margin-left: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.carpark-btn {
  border-radius: 4px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  background-color: #2ea85b;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  border: none;
  color: #fff;
  padding: 12px 20px;
  margin-bottom: 8px;
  text-decoration: none;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
