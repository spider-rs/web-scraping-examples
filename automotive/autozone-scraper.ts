/**
 * AutoZone Scraper
 *
 * Scrape AutoZone parts inventory, pricing, store availability, and DIY repair gui
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx autozone-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.autozone.com/motor-oil-and-transmission-fluid/motor-oil/mobil-1-advanced-full-synthetic-motor-oil-5w-30-5-quart/953876_0_0");
await page.content();

const data = await page.extractFields({
  name: "[data-testid='product-title']",
  price: "[data-testid='product-price']",
  partNumber: "[data-testid='part-number']",
  rating: "[data-testid='product-rating']",
  availability: "[data-testid='store-availability']",
  image: { selector: "[data-testid='product-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
