/**
 * Intercom Scraper
 *
 * Extract product features, pricing plans, integration listings, and help center c
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx intercom-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.intercom.com/pricing");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  planName: "[data-testid='pricing-plan-name']",
  price: "[data-testid='pricing-plan-price']",
  features: "[data-testid='pricing-features-list']",
  cta: "[data-testid='pricing-cta']",
  addOns: "[data-testid='add-on-section']",
});

console.log(data);
await spider.close();
