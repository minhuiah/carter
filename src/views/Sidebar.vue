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
  </div>
</template>

<script lang="ts">
import { useCarparkStore } from "@/stores/Carparks";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import { Icon } from "@vicons/utils";
import { Directions, MoneyBill } from "@vicons/fa";
import { useMapStore } from "@/stores/Map";

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
  },
  computed: {
    ...mapState(useCarparkStore, ["carparks"]),
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
</style>
