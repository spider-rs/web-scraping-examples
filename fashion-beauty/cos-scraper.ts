/**
 * COS Scraper
 *
 * Extract minimalist fashion listings, material details, pricing, and seasonal pic
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cos-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.cos.com/en_usd/women/womenswear/dresses.html");
await page.content(10000);

const data = await page.extractFields({
  name: ".product-tile__name",
  price: ".product-tile__price",
  color: ".product-tile__color",
  image: { selector: ".product-tile__image img", attribute: "src" },
});

console.log(data);
await spider.close();
