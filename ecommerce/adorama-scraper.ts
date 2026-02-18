/**
 * Adorama Scraper
 *
 * Extract camera equipment listings, specifications, pricing, and bundle deals fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx adorama-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.adorama.com/l/Photography/Lenses/Mirrorless-Lenses");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".item-list__item").forEach(el => {
    const name = el.querySelector(".item-list__title")?.textContent?.trim();
    const price = el.querySelector(".item-list__price")?.textContent?.trim();
    const rating = el.querySelector(".item-list__rating")?.getAttribute("aria-label");
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
