/**
 * Wayfair Scraper
 *
 * Extract furniture and home decor product data from Wayfair — title,
 * price, rating, availability, and product images.
 *
 * Uses `evaluate()` with ProductCard testid selectors.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecommerce/wayfair-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.wayfair.com/furniture/sb0/sofas-c413892.html");

const data = await page.evaluate(() => {
  const items = document.querySelectorAll("[data-testid^='ProductCard']");
  return Array.from(items).map((item) => ({
    title: item.querySelector("[data-testid='ProductCardTitle']")?.textContent?.trim(),
    price: item.querySelector("[data-testid='ProductCardPrice']")?.textContent?.trim(),
    rating: item.querySelector("[data-testid='ProductCardRating']")?.textContent?.trim(),
    availability: item.querySelector("[data-testid='ProductCardAvailability']")?.textContent?.trim(),
    image: item.querySelector("img")?.getAttribute("src"),
  }));
});

console.log(data);
await spider.close();
