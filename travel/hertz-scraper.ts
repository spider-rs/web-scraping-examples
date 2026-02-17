/**
 * Hertz Scraper
 *
 * Extract rental car availability, vehicle categories, daily rates, and pickup loc
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hertz-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.hertz.com/rentacar/reservation/reviewmodify?pickupDate=06/01/2026&returnDate=06/05/2026&pickupLocation=LAXC01");
await page.content(12000);

const data = await page.extractFields({
  vehicleClass: ".vehicle-card__class",
  rate: ".vehicle-card__rate",
  total: ".vehicle-card__total",
  features: ".vehicle-card__features",
  seats: ".vehicle-card__seats",
  image: { selector: ".vehicle-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
