/**
 * About You Scraper
 *
 * Extract fashion listings, influencer collections, pricing in EUR, and brand data
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx about-you-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.aboutyou.com/c/women/clothing-20204");
await page.content(10000);

const data = await page.extractFields({
  brand: "[data-testid='productCard'] .brand",
  name: "[data-testid='productCard'] .name",
  price: "[data-testid='productCard'] .price",
  image: { selector: "[data-testid='productCard'] img", attribute: "src" },
});

console.log(data);
await spider.close();
