/**
 * Norwegian Air Scraper
 *
 * Extract low-cost European and transatlantic flight fares, fare types, and route 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx norwegian-air-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.norwegian.com/en/booking/flight-offers/?D_City=OSL&A_City=BCN&D_Day=01&D_Month=202607&R_Day=08&R_Month=202607&AdultCount=1&ChildCount=0&InfantCount=0&TripType=1");
await page.content(12000);

const data = await page.extractFields({
  flightNumber: "[class*='flight-number']",
  departure: "[class*='departure-time']",
  arrival: "[class*='arrival-time']",
  duration: "[class*='flight-duration']",
  price: "[class*='fare-price'], [class*='price']",
  fareType: "[class*='fare-type'], [class*='cabin-class']",
});

console.log(data);
await spider.close();
