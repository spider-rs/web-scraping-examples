/**
 * IIHS Scraper
 *
 * Scrape IIHS crash test results, Top Safety Pick awards, headlight ratings, and c
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx iihs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.iihs.org/ratings/vehicle/toyota/camry-4-door-sedan/2024");

const data = await page.extractFields({
  vehicle: "h1.rating-vehicle-title",
  award: ".top-safety-pick-badge",
  overallRating: ".overall-evaluation-rating",
  driverSide: ".rating-driver-side",
  passengerSide: ".rating-passenger-side",
  headlights: ".headlight-rating",
});

console.log(data);
await spider.close();
