/**
 * Networx Scraper
 *
 * Extract local contractor profiles, service cost calculators, homeowner review da
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx networx-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.networx.com/plumbing-contractors/dallas-tx");
await page.content();

const data = await page.extractFields({
  name: ".contractor-card__name",
  rating: ".contractor-card__rating",
  reviews: ".contractor-card__reviews",
  service: ".contractor-card__service",
  cost: ".contractor-card__avg-cost",
  phone: ".contractor-card__phone",
});

console.log(data);
await spider.close();
