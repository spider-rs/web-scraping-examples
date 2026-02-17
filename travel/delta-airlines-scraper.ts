/**
 * Delta Airlines Scraper
 *
 * Extract flight availability, SkyMiles redemption rates, fare classes, and seat m
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx delta-airlines-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.delta.com/flight-search/search?cacheKeySuffix=a1&action=findFlights&tripType=ONE_WAY&departureDate=2026-07-15&returnDate=&origin=ATL&destination=LAX");
await page.content(15000);

const data = await page.extractFields({
  flightNumber: "[data-testid='flight-number']",
  departure: "[data-testid='departure-time']",
  arrival: "[data-testid='arrival-time']",
  duration: "[data-testid='flight-duration']",
  price: "[data-testid='fare-price']",
  aircraft: "[data-testid='aircraft-type']",
});

console.log(data);
await spider.close();
