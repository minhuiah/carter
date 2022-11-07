<template>
  <div class="calculator">
    <div class="calculator-title">Cost Tracker</div>
    {{ rates }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import carparks from "@/assets/data/carparks.json";

interface Rate {
  time_range: string;
  rate_cost: number;
  rate_time: number;
}

interface DayRate {
  day: number;
  flat_rate: {
    per_entry_rate: number;
    flat_rate: number;
  };
  rate: Rate[];
}

export default defineComponent({
  data() {
    return {
      carparks,
      rates: [] as DayRate[] | DayRate,
    };
  },
  mounted() {
    if (this.$route.params.address) {
      for (let carpark of carparks) {
        if (this.$route.params.address === carpark.address) {
          this.rates = carpark.parking_rate;
          console.log(this.rates);
        }
      }
    } else {
      return this.$router.push({ name: "carparks" });
    }
  },
});
</script>

<style scoped>
.calculator {
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  transition: 200ms ease-in all;
}
.calculator-title {
  font-weight: 600;
  margin-top: 2rem;
}
</style>
