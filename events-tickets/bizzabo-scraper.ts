/**
 * Bizzabo Scraper
 *
 * Extract professional event data, speaker lineups, sponsor listings, and registra
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bizzabo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.bizzabo.com/events");
await page.content(10000);

const data = await page.extractFields({
  eventName: "[data-testid='event-card'] h3",
  date: "[data-testid='event-card'] [data-testid='event-date']",
  location: "[data-testid='event-card'] [data-testid='event-location']",
  description: "[data-testid='event-card'] p",
  speakers: "[data-testid='event-card'] [data-testid='speaker-count']",
  registration: "[data-testid='event-card'] [data-testid='registration-status']",
});

console.log(data);
await spider.close();
