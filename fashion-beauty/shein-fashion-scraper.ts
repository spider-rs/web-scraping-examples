/**
 * Shein Fashion Scraper
 *
 * Extract fast fashion product data, flash deals, ratings, and inventory from Shei
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx shein-fashion-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://us.shein.com/Women-Dresses-c-1727.html");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".S-product-item").forEach(el => {
    const name = el.querySelector(".S-product-item__name")?.textContent?.trim();
    const price = el.querySelector(".product-item__camecase-wrap .original")?.textContent?.trim();
    const discount = el.querySelector(".product-item__camecase-wrap .discount")?.textContent?.trim();
    if (name) items.push({ name, price, discount });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
