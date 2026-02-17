/**
 * Newegg Scraper
 *
 * Extract graphics card and computer hardware product data from Newegg —
 * title, price, rating, seller, and product images.
 *
 * Uses `evaluate()` with .item-cell elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecommerce/newegg-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.newegg.com/p/pl?d=graphics+card");

const data = await page.evaluate(() => {
  const items = document.querySelectorAll(".item-cell");
  return Array.from(items).map((item) => ({
    title: item.querySelector(".item-title")?.textContent?.trim(),
    price: item.querySelector(".price-current")?.textContent?.trim(),
    rating: item.querySelector(".item-rating")?.textContent?.trim(),
    seller: item.querySelector(".seller-info")?.textContent?.trim(),
    image: item.querySelector("img")?.getAttribute("src"),
  }));
});

console.log(data);
await spider.close();
