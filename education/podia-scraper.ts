/**
 * Podia Scraper
 *
 * Extract creator economy platform features, digital product templates, membership
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx podia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.podia.com/pricing");

const data = await page.extractFields({
  planName: ".plan-card h2",
  price: ".plan-card .plan-price",
  description: ".plan-card .plan-description",
  features: ".plan-card .features li",
  cta: ".plan-card .cta-link",
  badge: ".plan-card .recommended-badge",
});

console.log(data);
await spider.close();
