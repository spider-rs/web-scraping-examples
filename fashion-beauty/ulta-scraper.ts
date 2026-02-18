/**
 * Ulta Scraper
 *
 * Extract beauty and skincare product data, deals, ratings, and brand info from Ul
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ulta-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ulta.com/shop/makeup/bestsellers");
await page.content(10000);

const data = await page.extractFields({
  brand: ".ProductCard .ProductCard__brand",
  name: ".ProductCard .ProductCard__title",
  price: ".ProductCard .ProductCard__price",
  rating: { selector: ".ProductCard .Stars", attribute: "aria-label" },
});

console.log(data);
await spider.close();
