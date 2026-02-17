/**
 * Asana Scraper
 *
 * Extract project management features, pricing tiers, template galleries, and inte
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx asana-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://asana.com/pricing");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  planName: ".pricing-plan__title",
  price: ".pricing-plan__price",
  period: ".pricing-plan__period",
  features: ".pricing-plan__features li",
  cta: ".pricing-plan__cta",
});

console.log(data);
await spider.close();
