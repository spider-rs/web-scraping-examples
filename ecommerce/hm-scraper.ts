/**
 * H&M Scraper
 *
 * Extract apparel listings, pricing, color swatches, and availability from H&M fas
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hm-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www2.hm.com/en_us/men/products/shirts.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("article.hm-product-item").forEach(el => {
    const name = el.querySelector("h2.item-heading a")?.textContent?.trim();
    const price = el.querySelector(".item-price span")?.textContent?.trim();
    const colors = el.querySelector(".item-colors")?.textContent?.trim();
    if (name) items.push({ name, price, colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
