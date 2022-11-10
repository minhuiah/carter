import { defineStore } from "pinia";
import type { Carpark } from "./Carparks";
import type { Rental } from "./Rental";

export const useSpotlightStore = defineStore("spotlight", {
  state: () => {
    return { data: {} as Carpark | Rental };
  },
  actions: {
    show(target: Carpark | Rental) {
      this.data = target;
    },
  },
});
