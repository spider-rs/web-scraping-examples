/**
 * Zappos Scraper
 *
 * Extract footwear product listings, size availability, pricing, and brand data fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zappos-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.zappos.com/men-running-shoes");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-search-result]").forEach(el => {
    const brand = el.querySelector("[itemprop='brand']")?.textContent?.trim();
    const name = el.querySelector("[itemprop='name']")?.textContent?.trim();
    const price = el.querySelector("[itemprop='price']")?.textContent?.trim();
    const rating = el.querySelector("[itemprop='ratingValue']")?.getAttribute("content");
    if (name) items.push({ brand, name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
