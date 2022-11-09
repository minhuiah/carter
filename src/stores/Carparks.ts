import { defineStore } from "pinia";
import proj4 from "proj4";
import rawCarparkData from "@/assets/data/carparks.json";
import axios from "axios";

export interface Carpark {
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
  carParkDecks: string;
  gantryHeight: string;
}

export const useCarparkStore = defineStore("carparks", {
  state: () => {
    return { carparks: [] as Carpark[] };
  },
  actions: {
    async get() {
      let response = await axios.get("http://localhost:3000/carparks");
      this.carparks = response.data;
    },
  },
});
