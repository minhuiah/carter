import express, { Request, Response } from "express";
import fetch from "node-fetch-commonjs";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/rental", async (_req: Request, res: Response) => {
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

  let cars = await fetch("https://api.bluesg.com.sg/v2/station/?filter=cars", {
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
  });

  const carData = await cars.json();
  return res.json(carData);
});

app.listen(3000, () => {
  console.log(`up`);
});
