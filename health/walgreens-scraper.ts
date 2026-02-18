/**
 * Walgreens Scraper
 *
 * Extract prescription pricing, health product listings, clinic services, and stor
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx walgreens-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.walgreens.com/search/results.jsp?Ntt=pain+relief");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const products = [];
  document.querySelectorAll(".card__product, [class*='ProductCard']").forEach(el => {
    const name = el.querySelector(".card__productName, [class*='productName']")?.textContent?.trim();
    const price = el.querySelector(".product__price, [class*='Price']")?.textContent?.trim();
    const rating = el.querySelector("[class*='rating']")?.textContent?.trim();
    if (name) products.push({ name, price, rating });
  });
  return JSON.stringify({ total: products.length, products: products.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
