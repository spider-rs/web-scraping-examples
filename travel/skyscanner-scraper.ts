/**
 * Skyscanner Scraper
 *
 * Scrapes flight search results from Skyscanner including airlines, prices, and times.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx travel/skyscanner-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.skyscanner.com/transport/flights/nyca/lond/2026-05-15/"
);
await page.content(15000);
const data = await page.evaluate(`
  Array.from(document.querySelectorAll("[data-testid='FlightsResults'] [data-testid='ItineraryContainer']")).map(item => ({
    airline: item.querySelector("[data-testid='airline-name']")?.textContent?.trim() || '',
    departTime: item.querySelector("[data-testid='departure-time']")?.textContent?.trim() || '',
    arriveTime: item.querySelector("[data-testid='arrival-time']")?.textContent?.trim() || '',
    duration: item.querySelector("[data-testid='duration']")?.textContent?.trim() || '',
    price: item.querySelector("[data-testid='price']")?.textContent?.trim() || '',
    stops: item.querySelector("[data-testid='stops']")?.textContent?.trim() || ''
  }))
`);
console.log(JSON.parse(data));
await spider.close();
