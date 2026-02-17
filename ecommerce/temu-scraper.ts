/**
 * Temu Scraper
 *
 * Extract discount product listings, flash deal pricing, and seller info from Temu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx temu-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.temu.com/search_result.html?search_key=headphones");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='search-result-item']").forEach(el => {
    const name = el.querySelector("[data-testid='item-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='item-price']")?.textContent?.trim();
    const sold = el.querySelector("[data-testid='item-sold']")?.textContent?.trim();
    if (name) items.push({ name, price, sold });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
