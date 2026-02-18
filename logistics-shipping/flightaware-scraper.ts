/**
 * FlightAware Scraper
 *
 * Extract live flight tracking data, airport delay statuses, historical flight rec
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx flightaware-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.flightaware.com/live/airport/KJFK");
await page.content();

const data = await page.evaluate(`(() => {
  const flights = [];
  document.querySelectorAll("table.prettyTable tbody tr, .flightRow").forEach(el => {
    const ident = el.querySelector("td:nth-child(1) a, .ident")?.textContent?.trim();
    const type = el.querySelector("td:nth-child(2), .aircraftType")?.textContent?.trim();
    const origin = el.querySelector("td:nth-child(3) a, .origin")?.textContent?.trim();
    const departure = el.querySelector("td:nth-child(4), .departure")?.textContent?.trim();
    const arrival = el.querySelector("td:nth-child(5), .arrival")?.textContent?.trim();
    if (ident) flights.push({ ident, type, origin, departure, arrival });
  });
  return JSON.stringify({ total: flights.length, flights: flights.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
