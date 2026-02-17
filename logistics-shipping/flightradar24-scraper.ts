/**
 * FlightRadar24 Scraper
 *
 * Extract real-time aircraft positions, flight path histories, airport statistics,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx flightradar24-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.flightradar24.com/airport/jfk");
await page.content(8000);

const data = await page.extractFields({
  airportName: "h1.airport-name",
  arrivals: ".arrivals-table .flight-row .flight-id",
  departures: ".departures-table .flight-row .flight-id",
  airlines: ".flight-row .airline-name",
  statuses: ".flight-row .flight-status",
  times: ".flight-row .flight-time",
  gates: ".flight-row .gate",
});

console.log(data);
await spider.close();
