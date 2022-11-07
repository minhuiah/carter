import { defineStore } from "pinia";
// import proj4 from "proj4";
import axios from "axios";
// export interface Carpark {
//   lat: number;
//   lng: number;
//   availableLots: number;
//   totalLots: number;
//   address: string;
//   type: string;
//   system: string;
//   shortTermParking: string;
//   freeParking: string;
//   nightParking: boolean;
//   carParkDecks: string;
//   gantryHeight: string;
// }
export const useRentalStore = defineStore("rentals", {
    state: () => {
        return { rentals: [] };
    },
    actions: {
        async get() {
            let data = await axios.get("https://api.bluesg.com.sg/oauth2/token/", {
                headers: {
                    authority: "api.bluesg.com.sg",
                    accept: "application/json, text/plain, */*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    authorization: "Basic d2ViX3N0YXRpb25zX21hcDp3ZWJfc3RhdGlvbl9tYXA=",
                    "cache-control": "no-cache",
                    "content-type": "application/x-www-form-urlencoded",
                    origin: "https://membership.bluesg.com.sg",
                    cookie: "_ga_N2P8DEFNKD=GS1.1.1664957029.1.0.1664957029.0.0.0; _ga=GA1.1.661761285.1664957030",
                    pragma: "no-cache",
                    "sec-ch-ua": '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
                    "sec-ch-ua-mobile": "?1",
                    "sec-ch-ua-platform": "Android",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36",
                },
                data: {
                    grant_type: "client_credentials",
                },
            });
            console.log(data);
            // if (data) {
            //   for (let carpark of data.data.items[0].carpark_data) {
            //     for (let c of rawCarparkData) {
            //       if (c.car_park_no === carpark.carpark_number) {
            //         let coords = proj4(
            //           "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs",
            //           "+proj=longlat +datum=WGS84 +no_defs",
            //           [c.x_coord, c.y_coord]
            //         );
            //         this.carparks.push({
            //           lat: coords[0],
            //           lng: coords[1],
            //           availableLots: carpark.carpark_info[0].lots_available,
            //           totalLots: carpark.carpark_info[0].total_lots,
            //           address: c.address,
            //           type:
            //             c.car_park_type === -1
            //               ? "Basement"
            //               : c.car_park_type === 0
            //               ? "Surface"
            //               : "MSCP",
            //           system: c.type_of_parking_system === 0 ? "Coupon" : "EPS",
            //           shortTermParking: c.short_term_parking === 0 ? "No" : "Yes",
            //           freeParking: c.free_parking,
            //           nightParking: c.night_parking === 0 ? false : true,
            //           carParkDecks: c.car_park_decks,
            //           gantryHeight: c.gantry_height,
            //         });
            //       }
            //     }
            //   }
            // }
        },
    },
});
