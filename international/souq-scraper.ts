/**
 * Souq Scraper
 *
 * Extract product listings, pricing in local currencies, seller ratings, and deals
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx souq-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.souq.com/eg-en/electronics-accessories/c/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".single-item").forEach(el => {
    const name = el.querySelector(".itemTitle")?.textContent?.trim();
    const price = el.querySelector(".itemPrice")?.textContent?.trim();
    const rating = el.querySelector(".ratings")?.getAttribute("aria-label");
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
