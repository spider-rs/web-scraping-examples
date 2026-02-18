/**
 * Rakuten Scraper
 *
 * Extract product listings, store ratings, cashback offers, and pricing data from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rakuten-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://search.rakuten.co.jp/search/mall/laptop/");
await page.content(10000);

const data = await page.extractFields({
  name: ".searchresultitem .title a",
  price: ".searchresultitem .important",
  shop: ".searchresultitem .merchant",
  rating: { selector: ".searchresultitem .review", attribute: "title" },
});

console.log(data);
await spider.close();
