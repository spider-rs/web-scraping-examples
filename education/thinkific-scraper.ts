/**
 * Thinkific Scraper
 *
 * Extract online course marketplace listings, platform features, pricing plans, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx thinkific-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.thinkific.com/pricing/");

const data = await page.extractFields({
  planName: ".pricing-card h3",
  price: ".pricing-card .price-amount",
  period: ".pricing-card .price-period",
  features: ".pricing-card .feature-list li",
  cta: ".pricing-card .cta-button",
  highlight: ".pricing-card .popular-badge",
});

console.log(data);
await spider.close();
