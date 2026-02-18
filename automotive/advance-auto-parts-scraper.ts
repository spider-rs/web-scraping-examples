/**
 * Advance Auto Parts Scraper
 *
 * Scrape Advance Auto Parts product listings, Speed Perks pricing, store availabil
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx advance-auto-parts-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://shop.advanceautoparts.com/find/brake-pads");
await page.content();

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll(".product-card-container").forEach(el => {
    const name = el.querySelector(".product-name a")?.textContent?.trim();
    const price = el.querySelector(".product-price .price-value")?.textContent?.trim();
    const partNum = el.querySelector(".part-number")?.textContent?.trim();
    const brand = el.querySelector(".brand-name")?.textContent?.trim();
    const rating = el.querySelector(".star-rating-value")?.textContent?.trim();
    if (name) products.push({ name, price, partNum, brand, rating });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
