/**
 * Shein Scraper
 *
 * Extract fast fashion listings, flash sale pricing, and trend data from Shein wit
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx shein-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://us.shein.com/Women-Dresses-c-1727.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-list-v2__container .product-card").forEach(el => {
    const name = el.querySelector(".product-card__goods-title-container")?.textContent?.trim();
    const price = el.querySelector(".product-card__prices-info")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) items.push({ name, price, link });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
