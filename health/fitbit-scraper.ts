/**
 * Fitbit Scraper
 *
 * Extract fitness tracker specifications, health feature comparisons, product pric
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fitbit-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.fitbit.com/global/us/products/trackers");
await page.content();

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll(".product-card, [class*='ProductCard']").forEach(el => {
    const name = el.querySelector("h2, h3, .product-name")?.textContent?.trim();
    const price = el.querySelector(".price, [class*='price']")?.textContent?.trim();
    const description = el.querySelector("p, .product-description")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) products.push({ name, price, description, link });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
