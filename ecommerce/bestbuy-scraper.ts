/**
 * Best Buy Scraper
 *
 * Extract product data from Best Buy search results — SKU, title,
 * price, rating, and product images.
 *
 * Uses `evaluate()` to extract .sku-item list data.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ecommerce/bestbuy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.bestbuy.com/site/searchpage.jsp?st=macbook+pro");

const data = await page.evaluate(() => {
  const items = document.querySelectorAll(".sku-item");
  return Array.from(items).map((item) => ({
    title: item.querySelector(".sku-title a")?.textContent?.trim(),
    price: item.querySelector(".priceView span")?.textContent?.trim(),
    rating: item.querySelector(".rating")?.getAttribute("aria-label"),
    image: item.querySelector("img")?.getAttribute("src"),
  }));
});

console.log(data);
await spider.close();
