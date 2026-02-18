/**
 * Coach Scraper
 *
 * Scrape luxury handbag listings, leather craft details, monogram options, and pri
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx coach-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.coach.com/shop/women/bags/shoulder-bags");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product-card").forEach(el => {
    const name = el.querySelector(".product-card__name")?.textContent?.trim();
    const price = el.querySelector(".product-card__price")?.textContent?.trim();
    const badge = el.querySelector(".product-card__badge")?.textContent?.trim();
    const colors = el.querySelectorAll(".product-card__swatch").length;
    if (name) items.push({ name, price, badge, colorCount: colors });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
