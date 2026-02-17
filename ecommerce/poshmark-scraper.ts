/**
 * Poshmark Scraper
 *
 * Extract resale fashion listings, seller profiles, pricing, and brand data from P
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx poshmark-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://poshmark.com/category/Women-Bags-Crossbody_Bags");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-et-name='listing']").forEach(el => {
    const title = el.querySelector(".tile__title")?.textContent?.trim();
    const price = el.querySelector(".fw--bold")?.textContent?.trim();
    const brand = el.querySelector(".tile__details__pipe__brand")?.textContent?.trim();
    const size = el.querySelector(".tile__details__pipe__size")?.textContent?.trim();
    if (title) items.push({ title, price, brand, size });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
