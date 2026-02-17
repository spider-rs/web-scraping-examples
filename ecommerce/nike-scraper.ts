/**
 * Nike Scraper
 *
 * Extract men's shoe product data from Nike — title, price,
 * rating, availability, and product images.
 *
 * Uses `evaluate()` with .product-card elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecommerce/nike-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.nike.com/w/mens-shoes-nik1zy7ok");

const data = await page.evaluate(() => {
  const items = document.querySelectorAll(".product-card");
  return Array.from(items).map((item) => ({
    title: item.querySelector(".product-card__title")?.textContent?.trim(),
    price: item.querySelector(".product-price")?.textContent?.trim(),
    rating: item.querySelector(".rating-badge")?.textContent?.trim(),
    available: item.querySelector(".product-card__status")?.textContent?.trim(),
    image: item.querySelector("img")?.getAttribute("src"),
  }));
});

console.log(data);
await spider.close();
