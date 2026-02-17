/**
 * Creative Market Scraper
 *
 * Extract design assets, font families, graphic templates, and creator shop data f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx creative-market-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://creativemarket.com/fonts");
await page.content();

const data = await page.extractFields({
  title: ".product-card__title",
  creator: ".product-card__creator",
  price: ".product-card__price",
  image: { selector: ".product-card__preview img", attribute: "src" },
});

console.log(data);
await spider.close();
