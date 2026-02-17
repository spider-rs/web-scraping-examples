/**
 * Grailed Scraper
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx grailed-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.grailed.com/designers/rick-owens");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-testid='FeedItem']").forEach(el => {
    const title = el.querySelector("[data-testid='listing-title']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='listing-price']")?.textContent?.trim();
    const designer = el.querySelector("[data-testid='listing-designer']")?.textContent?.trim();
    const size = el.querySelector("[data-testid='listing-size']")?.textContent?.trim();
    if (title) items.push({ title, price, designer, size });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
