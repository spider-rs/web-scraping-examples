/**
 * American Airlines Scraper
 *
 * Extract flight schedules, AAdvantage award pricing, cabin class options, and rou
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx american-airlines-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.aa.com/booking/search?locale=en_US&pax=1&type=OneWay&searchType=Revenue&cabin=&carriers=ALL&slices=%5B%7B%22orig%22:%22DFW%22,%22dest%22:%22MIA%22,%22origNearby%22:false,%22destNearby%22:false,%22date%22:%222026-07-10%22%7D%5D");
await page.content(15000);

const data = await page.extractFields({
  flightNumber: "[class*='flight-number'], .flt-number",
  departure: "[class*='departure-time'], .depart-time",
  arrival: "[class*='arrival-time'], .arrive-time",
  duration: "[class*='flight-duration'], .duration",
  price: "[class*='fare-total'], .price-point",
  cabin: "[class*='cabin-class'], .cabin-type",
});

console.log(data);
await spider.close();
