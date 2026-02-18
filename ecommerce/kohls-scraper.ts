/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kohls-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.kohls.com/catalog/mens-nike-shoes.jsp?CN=Gender:Mens+Brand:Nike+Department:Shoes");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='product-tile']").forEach(el => {
    const brand = el.querySelector("[data-testid='product-tile-brand']")?.textContent?.trim();
    const name = el.querySelector("[data-testid='product-tile-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='product-tile-price']")?.textContent?.trim();
    const rating = el.querySelector("[data-testid='product-tile-rating']")?.getAttribute("aria-label");
    if (name) items.push({ brand, name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
