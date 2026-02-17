/**
 * Trendyol Scraper
 *
 * Extract fashion and lifestyle product listings, pricing in TRY, and seller data 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx trendyol-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.trendyol.com/sr?q=elbise&qt=elbise&st=elbise");
await page.content(10000);

const data = await page.extractFields({
  brand: ".p-card-chldrn-cntnr .prdct-desc-cntnr-ttl",
  name: ".p-card-chldrn-cntnr .prdct-desc-cntnr-name",
  price: ".p-card-chldrn-cntnr .prc-box-dscntd",
  original: ".p-card-chldrn-cntnr .prc-box-sllng",
});

console.log(data);
await spider.close();
