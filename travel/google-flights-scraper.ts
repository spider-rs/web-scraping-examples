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
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.google.com/travel/flights?tfs=CBwQAhooEgoyMDI2LTA1LTE1GgppYjpKRkssMnEBKAExMAH6AQExAgEA"
);
await page.content(15000);
const data = await page.evaluate(`
  Array.from(document.querySelectorAll(".pIav2d")).map(flight => ({
    price: flight.querySelector("[data-testid='flight-price']")?.textContent?.trim() || '',
    departure: flight.querySelector("[data-testid='departure-time']")?.textContent?.trim() || '',
    arrival: flight.querySelector("[data-testid='arrival-time']")?.textContent?.trim() || '',
    airline: flight.querySelector("[data-testid='airline']")?.textContent?.trim() || '',
    duration: flight.querySelector("[data-testid='duration']")?.textContent?.trim() || '',
    stops: flight.querySelector("[data-testid='stops']")?.textContent?.trim() || ''
  }))
`);
console.log(JSON.parse(data));
await spider.close();
