/**
 * AliExpress Scraper
 *
 * Extract phone and electronics product data from AliExpress — title,
 * price, seller, rating, and product images.
 *
 * Uses `evaluate()` with search-item-card classes.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecommerce/aliexpress-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.aliexpress.com/category/44/phones-telecommunications.html");

const data = await page.evaluate(() => {
  const items = document.querySelectorAll(".search-item-card");
  return Array.from(items).map((item) => ({
    title: item.querySelector(".organic-list-offer-title")?.textContent?.trim(),
    price: item.querySelector(".organic-list-offer-price")?.textContent?.trim(),
    seller: item.querySelector(".organic-list-offer-shop")?.textContent?.trim(),
    rating: item.querySelector(".organic-list-offer-rating")?.textContent?.trim(),
    image: item.querySelector("img")?.getAttribute("src"),
  }));
});

console.log(data);
await spider.close();
