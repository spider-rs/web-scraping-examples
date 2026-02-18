/**
 * GOAT Scraper
 *
 * Extract sneaker listings, condition grades, pricing tiers, and authentication da
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx goat-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.goat.com/sneakers/air-jordan-1-retro-high-og-dz5485-612");

const data = await page.extractFields({
  name: "[data-testid='product-title']",
  price: "[data-testid='product-lowest-price']",
  colorway: "[data-testid='product-detail-colorway']",
  releaseDate: "[data-testid='product-detail-release-date']",
  retailPrice: "[data-testid='product-detail-retail-price']",
  image: { selector: "[data-testid='product-gallery'] img", attribute: "src" },
});

console.log(data);
await spider.close();
