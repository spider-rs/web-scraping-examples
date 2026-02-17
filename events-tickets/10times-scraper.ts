/**
 * 10Times Scraper
 *
 * Extract trade show listings, expo schedules, exhibitor data, and visitor info fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx 10times-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://10times.com/technology/tradeshows");
await page.content(10000);

const data = await page.extractFields({
  eventName: ".event-card h3 a",
  date: ".event-card .date",
  venue: ".event-card .venue",
  city: ".event-card .city",
  industry: ".event-card .industry-tag",
  visitors: ".event-card .visitor-count",
});

console.log(data);
await spider.close();
