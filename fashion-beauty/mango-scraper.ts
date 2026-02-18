/**
 * Mango Scraper
 *
 * Extract fashion catalog listings, seasonal collections, pricing, and size guides
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mango-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://shop.mango.com/us/en/c/women/dresses_c18269515");
await page.content(10000);

const data = await page.extractFields({
  name: ".product-list-name",
  price: ".product-list-price",
  color: ".product-list-color",
  link: { selector: ".product-list-item a", attribute: "href" },
});

console.log(data);
await spider.close();
