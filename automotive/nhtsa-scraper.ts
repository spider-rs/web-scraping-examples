/**
 * NHTSA Scraper
 *
 * Extract NHTSA vehicle safety ratings, recall notices, complaint data, and crash 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nhtsa-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.nhtsa.gov/vehicle/2024/TOYOTA/CAMRY/4%20DR/FWD");

const data = await page.extractFields({
  vehicle: "h1.vehicle-header",
  overallRating: ".overall-rating-value",
  frontalCrash: '[data-testid="frontal-rating"]',
  sideCrash: '[data-testid="side-rating"]',
  rollover: '[data-testid="rollover-rating"]',
  recallCount: ".recall-count",
});

console.log(data);
await spider.close();
