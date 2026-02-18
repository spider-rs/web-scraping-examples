/**
 * Google Flights Scraper
 *
 * Scrapes flight search results from Google Flights including prices, airlines, and details.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx travel/google-flights-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto(
  "https://www.google.com/travel/flights?tfs=CBwQAhooEgoyMDI2LTA1LTE1GgppYjpKRkssMnEBKAExMAH6AQExAgEA"
);
await page.content(15000);
const data = await page.evaluate(`
  Array.from(document.querySelectorAll("ul[role='list'] > li, li[data-ved]")).map(flight => ({
    departure: flight.querySelector("[aria-label*='Departure'], [aria-label*='Depart']")?.textContent?.trim() || '',
    arrival: flight.querySelector("[aria-label*='Arrival'], [aria-label*='Arrive']")?.textContent?.trim() || '',
    airline: flight.querySelector("img[alt]")?.getAttribute("alt")?.trim() || '',
    duration: flight.querySelector("[aria-label*='duration'], [aria-label*='Total duration']")?.textContent?.trim() || '',
    stops: flight.querySelector("[aria-label*='stop'], [aria-label*='Nonstop']")?.textContent?.trim() || '',
    price: flight.querySelector("[aria-label*='$'], [data-price]")?.textContent?.trim() || ''
  }))
`);
console.log(JSON.parse(data));
await spider.close();
