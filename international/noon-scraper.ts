/**
 * Noon Scraper
 *
 * Extract product listings, express delivery info, pricing in AED/SAR, and seller 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx noon-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.noon.com/uae-en/electronics-and-mobiles/mobiles-and-accessories/mobiles/");
await page.content(10000);

const data = await page.extractFields({
  name: "[data-qa='product-name']",
  price: "[data-qa='product-price']",
  rating: "[data-qa='product-rating']",
  express: "[data-qa='product-express']",
});

console.log(data);
await spider.close();
