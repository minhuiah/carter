<template>
  <div class="list">
    <div v-if="$route.name === 'carparks'">
      <div v-for="carpark in carparks" class="list-item">
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
        <div class="list-button">Get Directions</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCarparkStore } from "@/stores/Carparks";
import { mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
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
  padding: 1rem 0.5rem;
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
.list-button {
  background-color: #000;
  color: #fff;
  border-radius: 6px;
  padding: 0.2rem 0.8rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}
</style>
