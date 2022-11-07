import { defineStore } from "pinia";

export const useMapStore = defineStore("map", {
  state: () => {
    return {
      location: {
        lng: 103.852119,
        lat: 1.296568,
      },
    };
  },
  actions: {
    flyTo(lng: number, lat: number) {
      this.location.lng = lng;
      this.location.lat = lat;
      console.log(lng, lat);
    },
  },
});
