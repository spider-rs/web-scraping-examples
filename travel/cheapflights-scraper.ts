/**
 * Cheapflights Scraper
 *
 * Extract discount flight deals, fare comparisons, and budget airline pricing from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cheapflights-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.cheapflights.com/flight-search/SFO-TYO/2026-08-01");
await page.content(15000);

const data = await page.extractFields({
  airline: ".c_cgF-carrier-name",
  price: ".f8F1-price-text",
  departure: ".vmXl-mod-variant-large .depart-time",
  arrival: ".vmXl-mod-variant-large .arrival-time",
  duration: ".xdW8-duration span",
  stops: ".JWEO-stops-text",
});

console.log(data);
await spider.close();
