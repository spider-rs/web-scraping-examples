/**
 * Carousell Scraper
 *
 * Extract classified listings, seller verification status, pricing, and chat-to-bu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx carousell-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.carousell.com/search/electronics");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='listing-card']").forEach(el => {
    const title = el.querySelector("[data-testid='listing-card-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='listing-card-price']")?.textContent?.trim();
    const seller = el.querySelector("[data-testid='listing-card-seller']")?.textContent?.trim();
    const condition = el.querySelector("[data-testid='listing-card-condition']")?.textContent?.trim();
    if (title) items.push({ title, price, seller, condition });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
