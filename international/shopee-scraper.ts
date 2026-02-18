/**
 * Shopee Scraper
 *
 * Extract product listings, flash sales, voucher deals, and seller metrics from Sh
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx shopee-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://shopee.ph/search?keyword=wireless+earbuds");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".shopee-search-item-result__item").forEach(el => {
    const name = el.querySelector("[data-sqe='name']")?.textContent?.trim();
    const price = el.querySelector("[data-sqe='price']")?.textContent?.trim();
    const sold = el.querySelector(".shopee-search-item-result__item-sold")?.textContent?.trim();
    if (name) items.push({ name, price, sold });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
