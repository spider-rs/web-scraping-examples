/**
 * Monday.com Scraper
 *
 * Extract work management features, pricing plans, template galleries, and integra
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx monday-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://monday.com/pricing");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  planName: "[data-testid='plan-title']",
  price: "[data-testid='plan-price']",
  seats: "[data-testid='plan-seats']",
  features: "[data-testid='plan-features']",
  cta: "[data-testid='plan-cta-button']",
});

console.log(data);
await spider.close();
