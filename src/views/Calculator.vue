<template>
  <div class="calculator">
    <div class="calculator-title">Cost Tracker for</div>
    <div class="address">{{ $route.params.address }}</div>
    <div class="on">on a</div>
    <div class="day">{{ day }}</div>
    <table class="rate-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Time</th>
          <th>Rates / 30 minutes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="carparkRate in cleanRate">
          <td>{{ carparkRate.day }}</td>
          <td>{{ carparkRate.startTime }} - {{ carparkRate.endTime }}</td>
          <td>${{ carparkRate.rate.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <fieldset>
        <label for="start">Start Time</label>
        <input
          type="time"
          id="start"
          name="start"
          min="00:00"
          max="23:59"
          required
        />
      </fieldset>
      <fieldset>
        <label for="end">End Time</label>
        <input
          type="time"
          id="end"
          name="end"
          min="00:00"
          max="23:59"
          required
        />
      </fieldset>
    </div>
    {{ cleanRate }}
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
  computed: {
    day() {
      const d = new Date();
      let day = d.getDay();
      switch (day) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
      }
    },
    cleanRate() {
      let data = [];
      if (this.rates && this.rates instanceof Array) {
        for (let rate of this.rates) {
          let days = rate.day.toString().split("");
          for (let day of days) {
            let dayParsed;
            console.log(day);
            switch (parseInt(day)) {
              case 1:
                dayParsed = "Monday";
                break;
              case 2:
                dayParsed = "Tuesday";
                break;
              case 3:
                dayParsed = "Wednesday";
                break;
              case 4:
                dayParsed = "Thursday";
                break;
              case 5:
                dayParsed = "Friday";
                break;
              case 6:
                dayParsed = "Saturday";
                break;
              case 7:
                dayParsed = "Sunday";
                break;
            }
            for (let subRate of rate.rate) {
              let startTime = subRate.time_range.slice(0, 4);
              let endTime = subRate.time_range.slice(4);
              console.log(dayParsed);
              data.push({
                day: dayParsed,
                startTime,
                endTime,
                rate: subRate.rate_cost,
              });
            }
          }
        }
      }
      return data;
    },
  },
  mounted() {
    if (this.$route.params.address) {
      for (let carpark of carparks) {
        if (this.$route.params.address === carpark.address) {
          this.rates = carpark.parking_rate;
        }
      }
      if (!this.rates) {
        return this.$router.push({ name: "carparks" });
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
.address {
  font-size: 1.4rem;
  margin: 1rem 0 0.5rem 0;
}
.on {
  color: #5f5f5f;
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
}
.day {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.rate-table,
.rate-table th,
.rate-table td {
  border: 1px solid #5f5f5f;
  padding: 0.5rem;
}
.rate-table th {
  background-color: rgb(15, 10, 112);
  color: #fff;
}
</style>
