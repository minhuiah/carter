import express, { Request, Response } from "express";
import fetch from "node-fetch-commonjs";
import cors from "cors";
import proj4 from "proj4";
import NodeCache from "node-cache";

const rawCarparkData = require("./carparks.json");

const app = express();
app.use(cors());

const cache = new NodeCache();

app.get("/carparks", async (_req: Request, res: Response) => {
  if (cache.has("carparks")) {
    const cacheData = cache.get("carparks");
    res.json(cacheData);
    let response = await fetch(
      "https://api.data.gov.sg/v1/transport/carpark-availability"
    );
    const data = (await response.json()) as {
      items: [
        {
          timestamp: string;
          carpark_data: {
            carpark_info: {
              total_lots: string;
              lot_type: string;
              lots_available: string;
            }[];
            carpark_number: string;
            update_datetime: string;
          }[];
        }
      ];
    };

    let carparks = [];

    if (data && data.items.length > 0) {
      for (let carpark of data.items[0].carpark_data) {
        for (let c of rawCarparkData) {
          if (c.car_park_no === carpark.carpark_number) {
            let coords = proj4(
              "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs",
              "+proj=longlat +datum=WGS84 +no_defs",
              [c.x_coord, c.y_coord]
            );
            carparks.push({
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
    cache.set("carparks", carparks);
  } else {
    let response = await fetch(
      "https://api.data.gov.sg/v1/transport/carpark-availability"
    );
    const data = (await response.json()) as {
      items: [
        {
          timestamp: string;
          carpark_data: {
            carpark_info: {
              total_lots: string;
              lot_type: string;
              lots_available: string;
            }[];
            carpark_number: string;
            update_datetime: string;
          }[];
        }
      ];
    };

    let carparks = [];

    if (data && data.items.length > 0) {
      for (let carpark of data.items[0].carpark_data) {
        for (let c of rawCarparkData) {
          if (c.car_park_no === carpark.carpark_number) {
            let coords = proj4(
              "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs",
              "+proj=longlat +datum=WGS84 +no_defs",
              [c.x_coord, c.y_coord]
            );
            carparks.push({
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
    cache.set("carparks", carparks);
    return res.json(carparks);
  }
});

app.get("/rental", async (_req: Request, res: Response) => {
  if (cache.has("rental")) {
    const cacheData = cache.get("rental");
    res.json(cacheData);
    let response = await fetch("https://api.bluesg.com.sg/oauth2/token/", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9",
        authorization: "Basic d2ViX3N0YXRpb25zX21hcDp3ZWJfc3RhdGlvbl9tYXA=",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        cookie:
          "_ga_N2P8DEFNKD=GS1.1.1667811855.1.0.1667811855.0.0.0; _ga=GA1.1.1446382805.1667811856",
      },
      referrerPolicy: "same-origin",
      body: "grant_type=client_credentials",
      method: "POST",
    });
    const data = (await response.json()) as {
      access_token: string;
      token_type: string;
      expires_in: number;
    };

    let cars = await fetch(
      "https://api.bluesg.com.sg/v2/station/?filter=cars",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-GB,en;q=0.9",
          authorization: `bearer ${data.access_token}`,
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          cookie:
            "_ga_N2P8DEFNKD=GS1.1.1667811855.1.0.1667811855.0.0.0; _ga=GA1.1.1446382805.1667811856",
        },
        referrerPolicy: "same-origin",
        body: null,
        method: "GET",
      }
    );

    const carData = await cars.json();
    cache.set("rental", carData);
  } else {
    let response = await fetch("https://api.bluesg.com.sg/oauth2/token/", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9",
        authorization: "Basic d2ViX3N0YXRpb25zX21hcDp3ZWJfc3RhdGlvbl9tYXA=",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        cookie:
          "_ga_N2P8DEFNKD=GS1.1.1667811855.1.0.1667811855.0.0.0; _ga=GA1.1.1446382805.1667811856",
      },
      referrerPolicy: "same-origin",
      body: "grant_type=client_credentials",
      method: "POST",
    });
    const data = (await response.json()) as {
      access_token: string;
      token_type: string;
      expires_in: number;
    };

    let cars = await fetch(
      "https://api.bluesg.com.sg/v2/station/?filter=cars",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-GB,en;q=0.9",
          authorization: `bearer ${data.access_token}`,
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          cookie:
            "_ga_N2P8DEFNKD=GS1.1.1667811855.1.0.1667811855.0.0.0; _ga=GA1.1.1446382805.1667811856",
        },
        referrerPolicy: "same-origin",
        body: null,
        method: "GET",
      }
    );

    const carData = await cars.json();
    cache.set("rental", carData);
    res.json(carData);
  }
});

app.listen(3000, () => {
  console.log(`up`);
});
