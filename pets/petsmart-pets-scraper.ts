/**
 * PetSmart Pets Scraper
 *
 * Extract pet supply inventory, grooming service pricing, in-store availability, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx petsmart-pets-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.petsmart.com/dog/toys/");
await page.content(12000);

const data = await page.extractFields({
  name: "[data-testid='product-name']",
  price: "[data-testid='product-price']",
  salePrice: "[data-testid='sale-price']",
  rating: "[data-testid='product-rating']",
  reviews: "[data-testid='review-count']",
  image: { selector: "[data-testid='product-image'] img", attribute: "src" },
});

console.log(data);
await spider.close();
