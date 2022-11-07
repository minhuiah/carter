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
      let data = await axios.get(
        "https://api.data.gov.sg/v1/transport/carpark-availability"
      );

      if (data) {
        for (let carpark of data.data.items[0].carpark_data) {
          for (let c of rawCarparkData) {
            if (c.car_park_no === carpark.carpark_number) {
              let coords = proj4(
                "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs",
                "+proj=longlat +datum=WGS84 +no_defs",
                [c.x_coord, c.y_coord]
              );
              this.carparks.push({
                lat: coords[0],
                lng: coords[1],
                availableLots: carpark.carpark_info[0].lots_available,
                totalLots: carpark.carpark_info[0].total_lots,
                address: c.address,
                type:
                  c.car_park_type === -1
                    ? "Basement"
                    : c.car_park_type === 0
                    ? "Surface"
                    : "MSCP",
                system: c.type_of_parking_system === 0 ? "Coupon" : "EPS",
                shortTermParking: c.short_term_parking === 0 ? "No" : "Yes",
                freeParking: c.free_parking,
                nightParking: c.night_parking === 0 ? false : true,
                carParkDecks: c.car_park_decks,
                gantryHeight: c.gantry_height,
              });
            }
          }
        }
      }
    },
  },
});
