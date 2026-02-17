/**
 * Gilt Scraper
 *
 * Extract luxury flash sale listings, brand deals, member pricing, and limited off
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gilt-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.gilt.com/boutique/women/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const sales = [];
  document.querySelectorAll("[data-testid='sale-tile']").forEach(el => {
    const name = el.querySelector("[data-testid='sale-name']")?.textContent?.trim();
    const discount = el.querySelector("[data-testid='sale-discount']")?.textContent?.trim();
    const image = el.querySelector("img")?.src;
    if (name) sales.push({ name, discount, image });
  });
  return JSON.stringify({ total: sales.length, sales: sales.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
