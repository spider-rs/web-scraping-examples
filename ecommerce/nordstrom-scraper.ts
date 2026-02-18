/**
 * Nordstrom Scraper
 *
 * Extract women's clothing and dress product data from Nordstrom —
 * title, price, rating, brand, and product images.
 *
 * Uses `evaluate()` with productModule testid selectors.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecommerce/nordstrom-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.nordstrom.com/browse/women/clothing/dresses");

const data = await page.evaluate(() => {
  const items = document.querySelectorAll("[data-testid='productModule']");
  return Array.from(items).map((item) => ({
    title: item.querySelector("[data-testid='productName']")?.textContent?.trim(),
    brand: item.querySelector("[data-testid='productBrand']")?.textContent?.trim(),
    price: item.querySelector("[data-testid='productPrice']")?.textContent?.trim(),
    rating: item.querySelector("[data-testid='productRating']")?.textContent?.trim(),
    image: item.querySelector("img")?.getAttribute("src"),
  }));
});

console.log(data);
await spider.close();
