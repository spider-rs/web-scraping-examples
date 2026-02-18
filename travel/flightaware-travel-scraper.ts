/**
 * FlightAware Travel Scraper
 *
 * Extract flight status updates, delay predictions, airport activity, and historic
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx flightaware-travel-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.flightaware.com/live/airport/KJFK/departures");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll(".prettyTable tr.smallrow1, .prettyTable tr.smallrow2").forEach(el => {
    const ident = el.querySelector("td:nth-child(1)")?.textContent?.trim();
    const type = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const destination = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const departure = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    const arrival = el.querySelector("td:nth-child(5)")?.textContent?.trim();
    if (ident) flights.push({ ident, type, destination, departure, arrival });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
