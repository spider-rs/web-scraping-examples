/**
 * Etsy Scraper
 *
 * Extract product data from Etsy search results — title, price,
 * seller, rating, and product thumbnail images.
 *
 * Uses `evaluate()` to extract search result items.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecommerce/etsy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.etsy.com/search?q=handmade+pottery");

const data = await page.evaluate(() => {
  const items = document.querySelectorAll("[data-listing-id]");
  return Array.from(items).map((item) => ({
    title: item.querySelector("h2")?.textContent?.trim(),
    price: item.querySelector("[data-buy-box-region] .n-text-body-2")?.textContent?.trim(),
    seller: item.querySelector("a[data-shop-name]")?.textContent?.trim(),
    rating: item.querySelector("[aria-label*='star']")?.textContent?.trim(),
    image: item.querySelector("img")?.getAttribute("src"),
  }));
});

console.log(data);
await spider.close();
