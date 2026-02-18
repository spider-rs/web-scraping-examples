/**
 * Cars.com Scraper
 *
 * Extract vehicle listings, dealer inventory, pricing, and specs from Cars.com wit
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cars-com-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cars.com/vehicledetail/e]22bf45-7e1a-4b3c-9c5f-1a2b3c4d5e6f/");

const data = await page.extractFields({
  title: "h1.listing-title",
  price: ".primary-price",
  mileage: ".listing-mileage",
  dealer: ".dealer-name a",
  location: ".dealer-address",
  image: { selector: ".media-gallery img", attribute: "src" },
});

console.log(data);
await spider.close();
