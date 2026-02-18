/**
 * Chairish Scraper
 *
 * Extract vintage furniture listings, designer info, pricing, and provenance detai
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx chairish-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.chairish.com/collection/sofas");
await page.content();

const data = await page.extractFields({
  name: ".product-card__title",
  price: ".product-card__price",
  designer: ".product-card__designer",
  image: { selector: ".product-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
