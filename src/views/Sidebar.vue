<template>
  <div class="list">
    <div v-if="$route.name === 'carparks'">
      <div
        v-for="carpark in carparks"
        class="list-item"
        @click="flyToCarpark(carpark.lat, carpark.lng)"
      >
        <div class="list-title">{{ carpark.address }}</div>
        <div class="list-row">
          <div class="list-meta">
            {{
              carpark.freeParking === "NO"
                ? "Paid parking available"
                : "Free parking available"
            }}
          </div>
          <div>
            <div class="carpark-lots">
              {{ carpark.availableLots }} / {{ carpark.totalLots }}
            </div>
            <div class="carpark-indicator">
              <div
                class="indicator"
                :class="
                  carpark.availableLots / carpark.totalLots >= 0.25
                    ? 'indicator-green'
                    : carpark.availableLots > 0
                    ? 'indicator-orange'
                    : ''
                "
              ></div>
              <div
                class="indicator"
                :class="
                  carpark.availableLots / carpark.totalLots >= 0.5
                    ? 'indicator-green'
                    : ''
                "
              ></div>
              <div
                class="indicator"
                :class="
                  carpark.availableLots / carpark.totalLots >= 0.75
                    ? 'indicator-green'
                    : ''
                "
              ></div>
              <div
                class="indicator"
                :class="
                  carpark.availableLots / carpark.totalLots >= 0.9
                    ? 'indicator-green'
                    : ''
                "
              ></div>
            </div>
          </div>
        </div>
        <div class="list-meta">{{ carpark.type }} carpark</div>
        <div class="list-meta">
          Height restrictions: {{ carpark.gantryHeight }}m
        </div>
        <div class="list-btn-group">
          <div class="list-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              class="list-btn-icon"
            >
              <path
                d="M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z"
                fill="currentColor"
              ></path>
            </svg>
            <span class="list-btn-text">Get Directions</span>
          </div>
          <div class="list-btn">
            <svg
              class="list-btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 640 512"
            >
              <path
                d="M320 144c-53.02 0-96 50.14-96 112c0 61.85 42.98 112 96 112c53 0 96-50.13 96-112c0-61.86-42.98-112-96-112zm40 168c0 4.42-3.58 8-8 8h-64c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h16v-55.44l-.47.31a7.992 7.992 0 0 1-11.09-2.22l-8.88-13.31a7.992 7.992 0 0 1 2.22-11.09l15.33-10.22a23.99 23.99 0 0 1 13.31-4.03H328c4.42 0 8 3.58 8 8v88h16c4.42 0 8 3.58 8 8v16zM608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zm-16 272c-35.35 0-64 28.65-64 64H112c0-35.35-28.65-64-64-64V176c35.35 0 64-28.65 64-64h416c0 35.35 28.65 64 64 64v160z"
                fill="currentColor"
              ></path>
            </svg>
            <span class="list-btn-text">Cost Inquiry</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$route.name === 'rental'">
      <div
        v-for="car in rentals"
        class="list-item"
        @click="flyToCarpark(car.lng, car.lat)"
      >
        <div class="list-title">{{ car.address }}</div>
        <div class="list-meta list-meta-car">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            class="list-car-icon"
          >
            <path
              d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85s-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9s-12.8 31.9-32 31.9z"
              fill="currentColor"
            ></path>
          </svg>
          BlueCars: {{ car.cars_counter.bluecar }}
        </div>
        <div class="list-meta list-meta-car">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 640 512"
            class="list-car-icon"
          >
            <path
              d="M544 192h-16L419.22 56.02A64.025 64.025 0 0 0 369.24 32H155.33c-26.17 0-49.7 15.93-59.42 40.23L48 194.26C20.44 201.4 0 226.21 0 256v112c0 8.84 7.16 16 16 16h48c0 53.02 42.98 96 96 96s96-42.98 96-96h128c0 53.02 42.98 96 96 96s96-42.98 96-96h48c8.84 0 16-7.16 16-16v-80c0-53.02-42.98-96-96-96zM160 432c-26.47 0-48-21.53-48-48s21.53-48 48-48s48 21.53 48 48s-21.53 48-48 48zm72-240H116.93l38.4-96H232v96zm48 0V96h89.24l76.8 96H280zm200 240c-26.47 0-48-21.53-48-48s21.53-48 48-48s48 21.53 48 48s-21.53 48-48 48z"
              fill="currentColor"
            ></path>
          </svg>
          Opel Ecorsa: {{ car.cars_counter.opel_ecorsa }}
        </div>
        <div class="list-meta">Charging slots: {{ car.charge_slots }}</div>
        <div class="list-btn-group">
          <div class="list-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              class="list-btn-icon"
            >
              <path
                d="M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z"
                fill="currentColor"
              ></path>
            </svg>
            <span class="list-btn-text">Get Directions</span>
          </div>
          <div class="list-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 448 512"
              class="list-btn-icon"
            >
              <path
                d="M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526l31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z"
                fill="currentColor"
              ></path>
            </svg>
            <span @click="bookRentalCar()" class="list-btn-text">Book now</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCarparkStore } from "@/stores/Carparks";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import { Icon } from "@vicons/utils";
import { Directions, MoneyBill } from "@vicons/fa";
import { useMapStore } from "@/stores/Map";
import { useRentalStore } from "@/stores/Rental";

export default defineComponent({
  components: {
    Icon,
    Directions,
    MoneyBill,
  },
  methods: {
    flyToCarpark(lng: number, lat: number) {
      const useMap = useMapStore();
      useMap.flyTo(lng, lat);
    },
    bookRentalCar() {
      window.open("https://membership.bluesg.com.sg/account/home/");
    },
  },
  computed: {
    ...mapState(useCarparkStore, ["carparks"]),
    ...mapState(useRentalStore, ["rentals"]),
  },
});
</script>

<style scoped>
.list {
  overflow-y: scroll;
}
.list-item {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  padding: 1rem 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}
.list-item:hover {
  background-color: #f0f0f0;
}
.list-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.carpark-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}
.indicator {
  height: 0.4rem;
  width: 1rem;
  background-color: #dddddd;
  border-radius: 6px;
  margin: 0 2px;
}
.indicator-green {
  background-color: green;
}
.indicator-orange {
  background-color: orange;
}
.list-meta {
  font-size: 0.8rem;
  margin: 0.2rem 0;
}
.list-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.carpark-lots {
  font-size: 0.7rem;
  color: #5f5f5f;
}
.list-btn-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-top: 1px solid #e2e2e2;
}
.list-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.8rem;
  flex: 25% 0 0;
  text-align: center;
  border-right: 1px solid #e2e2e2;
  height: 56px;
  cursor: pointer;
  color: #3d3d3d;
}
.list-btn:first-child {
  border-left: 1px solid #e2e2e2;
}
.list-btn:hover {
  background-color: black;
  color: #fff;
}
.list-btn-text {
  margin-top: 0.4rem;
}
.list-btn-icon {
  height: 0.9rem;
  width: 0.9rem;
}

.list-car-icon {
  color: rgb(0, 13, 255);
  height: 0.9rem;
  width: 0.9rem;
  margin-right: 0.4rem;
}

.list-meta-car {
  display: flex;
  align-items: center;
}
</style>
