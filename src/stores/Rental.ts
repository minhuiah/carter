import { defineStore } from "pinia";
import axios from "axios";

export interface Rental {
  address: string;
  cars: number;
  cars_counter: { bluecar: number; opel_ecorsa: number };
  charge_slots: number;
  charging_status: string;
  city: string;
  displayed_comment: string;
  id: string;
  kind: string;
  lat: number;
  lng: number;
  postal_code: string;
  public_name: string;
  rental_status: string;
  scheduled_at: null;
  slots: number;
  station_type: string;
  status: string;
  subscription_status: string;
}

export const useRentalStore = defineStore("rentals", {
  state: () => {
    return { rentals: [] as Rental[] };
  },
  actions: {
    async get() {
      let response = await axios.get("http://localhost:3000/rental");
      this.rentals = response.data.results;
      console.log(this.rentals.length);
    },
  },
});
