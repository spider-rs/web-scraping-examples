/**
 * Vinted Scraper
 *
 * Extract secondhand fashion listings, brand filters, pricing, and buyer protectio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vinted-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.vinted.com/catalog?search_text=nike+sneakers");
await page.content(10000);

const data = await page.extractFields({
  title: "[data-testid='item-title']",
  price: "[data-testid='item-price']",
  brand: "[data-testid='item-brand']",
  size: "[data-testid='item-size']",
  image: { selector: "[data-testid='item-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
