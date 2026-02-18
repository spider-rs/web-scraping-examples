/**
 * Amazon Fresh Scraper
 *
 * Extract grocery product listings, deals, pricing, and availability from Amazon F
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx amazon-fresh-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.amazon.com/fresh");

const data = await page.extractFields({
  category: ".a-carousel-header h2",
  productName: ".a-carousel-card .a-size-base",
  price: ".a-carousel-card .a-price .a-offscreen",
  rating: ".a-carousel-card .a-icon-alt",
  brand: ".a-carousel-card .a-size-small",
});

console.log(data);
await spider.close();
