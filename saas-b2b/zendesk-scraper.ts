/**
 * Zendesk Scraper
 *
 * Extract support platform features, pricing plans, marketplace apps, and help cen
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zendesk-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.zendesk.com/pricing/");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  planName: "[data-testid='plan-name']",
  planPrice: "[data-testid='plan-price']",
  features: "[data-testid='features-list']",
  description: "[data-testid='plan-description']",
  cta: "[data-testid='plan-cta']",
});

console.log(data);
await spider.close();
