/**
 * Splash Scraper
 *
 * Extract branded event pages, registration data, attendee counts, and event marke
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx splash-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://splashthat.com/marketplace");
await page.content(10000);

const data = await page.extractFields({
  eventName: ".event-card h3",
  date: ".event-card time",
  location: ".event-card .location",
  host: ".event-card .host-name",
  description: ".event-card .description",
  status: ".event-card .registration-status",
});

console.log(data);
await spider.close();
