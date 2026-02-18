/**
 * SSENSE Scraper
 *
 * Extract luxury fashion listings, designer names, pricing tiers, and sale items f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ssense-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ssense.com/en-us/men/shoes");
await page.content(10000);

const data = await page.extractFields({
  designer: "[data-testid='product-card'] .designer-name",
  name: "[data-testid='product-card'] .product-name",
  price: "[data-testid='product-card'] .price",
  link: { selector: "[data-testid='product-card'] a", attribute: "href" },
});

console.log(data);
await spider.close();
