/**
 * Xfinity Scraper
 *
 * Extract internet speed tiers, cable TV bundles, promotional pricing, and equipme
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx xfinity-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.xfinity.com/learn/internet-service");
await page.content(12000);

const data = await page.extractFields({
  name: ".plan-card__title",
  price: ".plan-card__price",
  speed: ".plan-card__speed",
  features: ".plan-card__features",
  promo: ".plan-card__promo-badge",
  image: { selector: ".plan-card__icon img", attribute: "src" },
});

console.log(data);
await spider.close();
