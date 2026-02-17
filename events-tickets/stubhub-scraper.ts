/**
 * StubHub Scraper
 *
 * Extract resale ticket listings, pricing data, seat locations, and event availabi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx stubhub-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.stubhub.com/find/s/?q=NBA");
await page.content(10000);

const data = await page.extractFields({
  eventName: "[data-testid='event-card'] h3",
  date: "[data-testid='event-card'] [data-testid='event-date']",
  venue: "[data-testid='event-card'] [data-testid='event-venue']",
  priceRange: "[data-testid='event-card'] [data-testid='price-range']",
  tickets: "[data-testid='event-card'] [data-testid='ticket-count']",
  location: "[data-testid='event-card'] [data-testid='event-location']",
});

console.log(data);
await spider.close();
