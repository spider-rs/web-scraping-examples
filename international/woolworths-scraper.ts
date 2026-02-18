/**
 * Woolworths Scraper
 *
 * Extract grocery listings, pricing in AUD, weekly specials, and Everyday Rewards 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx woolworths-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.woolworths.com.au/shop/browse/fruit-veg");
await page.content(10000);

const data = await page.extractFields({
  name: ".product-tile-v2--title",
  price: ".product-tile-v2--price .primary",
  unitPrice: ".product-tile-v2--price .secondary",
  special: ".product-tile-v2--price .was-price",
});

console.log(data);
await spider.close();
