/**
 * CDC Scraper
 *
 * Extract disease surveillance data, vaccination schedules, outbreak alerts, and p
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cdc-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.cdc.gov/flu/about/index.html");

const data = await page.extractFields({
  title: "h1",
  keyFacts: ".card-body ul",
  prevention: "[data-defined='prevention'] .content",
  symptoms: "[data-defined='symptoms'] .content",
  statistics: ".data-visualization-container",
  lastReviewed: ".last-reviewed",
});

console.log(data);
await spider.close();
