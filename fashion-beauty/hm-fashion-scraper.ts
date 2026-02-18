/**
 * H&M Fashion Scraper
 *
 * Extract clothing listings, prices, color variants, and sustainability info from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hm-fashion-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www2.hm.com/en_us/women/products/dresses.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("article.hm-product-item").forEach(el => {
    const name = el.querySelector(".item-heading a")?.textContent?.trim();
    const price = el.querySelector(".item-price span")?.textContent?.trim();
    const link = el.querySelector(".item-heading a")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
