/**
 * StitchFix Scraper
 *
 * Extract style profiles, clothing recommendations, brand assortments, and pricing
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx stitchfix-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.stitchfix.com/women/shop");
await page.content(10000);

const data = await page.extractFields({
  name: ".product-card__title",
  brand: ".product-card__brand",
  price: ".product-card__price",
  image: { selector: ".product-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
