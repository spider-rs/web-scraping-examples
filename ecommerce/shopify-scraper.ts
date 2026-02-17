/**
 * Shopify Scraper (Allbirds)
 *
 * Extract men's shoe product data from Shopify-powered Allbirds store —
 * title, price, rating, available colors, and product images.
 *
 * Uses `evaluate()` with data-product-card selectors.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecommerce/shopify-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.allbirds.com/collections/mens-shoes");

const data = await page.evaluate(() => {
  const items = document.querySelectorAll("[data-product-card]");
  return Array.from(items).map((item) => ({
    title: item.querySelector("[data-product-name]")?.textContent?.trim(),
    price: item.querySelector("[data-product-price]")?.textContent?.trim(),
    rating: item.querySelector("[data-product-rating]")?.textContent?.trim(),
    colors: item.querySelectorAll("[data-color-option]").length,
    image: item.querySelector("img")?.getAttribute("src"),
  }));
});

console.log(data);
await spider.close();
