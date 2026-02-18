/**
 * Nextdoor Scraper
 *
 * Extract neighborhood marketplace listings, local service recommendations, and co
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nextdoor-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://nextdoor.com/for_sale_and_free/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='classified-item']").forEach(el => {
    const title = el.querySelector("[data-testid='classified-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='classified-price']")?.textContent?.trim();
    const location = el.querySelector("[data-testid='classified-location']")?.textContent?.trim();
    if (title) items.push({ title, price, location });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
