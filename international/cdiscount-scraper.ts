/**
 * Cdiscount Scraper
 *
 * Extract product listings, pricing in EUR, seller data, and flash deal info from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cdiscount-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.cdiscount.com/search/10/laptop.html");
await page.content(10000);

const data = await page.extractFields({
  name: ".prdtBILTit",
  price: ".prdtBILPrice",
  seller: ".prdtBILSeller",
  rating: { selector: ".prdtBILRating", attribute: "aria-label" },
});

console.log(data);
await spider.close();
