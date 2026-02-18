/**
 * Banana Republic Scraper
 *
 * Extract premium apparel listings, fabric info, pricing, and fit details from Ban
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx banana-republic-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://bananarepublic.gap.com/browse/category.do?cid=5343");

const data = await page.extractFields({
  name: ".product-card__name",
  price: ".product-card-price",
  colors: ".product-card__swatch-count",
  image: { selector: ".product-card__image img", attribute: "src" },
});

console.log(data);
await spider.close();
