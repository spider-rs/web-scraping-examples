/**
 * Frontier Airlines Scraper
 *
 * Extract ultra-low-cost flight fares, Discount Den pricing, bundle deals, and rou
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx frontier-airlines-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.flyfrontier.com/booking/flights?from=DEN&to=LAS&depart=2026-07-15&adult=1");
await page.content(12000);

const data = await page.extractFields({
  flightNumber: "[class*='flight-number']",
  departure: "[class*='departure-time']",
  arrival: "[class*='arrival-time']",
  duration: "[class*='flight-duration']",
  price: "[class*='fare-price'], [class*='price']",
  fareType: "[class*='fare-type'], [class*='bundle']",
});

console.log(data);
await spider.close();
