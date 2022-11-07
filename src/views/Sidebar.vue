<template>
  <div class="list">
    <div v-if="$route.name === 'carparks'">
      <div v-for="carpark in carparks" class="list-item">
        <div class="list-title">{{ carpark.address }}</div>
        <div>
          <div>{{ carpark.availableLots }} / {{ carpark.totalLots }}</div>
          <div class="carpark-indicator">
            <div></div>
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
}
.carpark-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
