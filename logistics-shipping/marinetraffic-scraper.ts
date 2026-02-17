/**
 * MarineTraffic Scraper
 *
 * Extract vessel positions, port arrival schedules, ship specifications, and marit
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx marinetraffic-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.marinetraffic.com/en/ais/details/ports/1/port:NEW-YORK");
await page.content(8000);

const data = await page.extractFields({
  portName: "h1.font-200",
  country: ".details-info .country",
  vessels: ".vessel-name a",
  arrivals: ".arrival-date",
  departures: ".departure-date",
  totalVessels: ".vessels-count",
  coordinates: ".coordinates",
});

console.log(data);
await spider.close();
