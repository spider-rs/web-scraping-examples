/**
 * Jumia Scraper
 *
 * Extract product listings, seller info, flash deals, and regional pricing from Ju
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jumia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.jumia.com.ng/phones-tablets/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("article.prd._fb").forEach(el => {
    const name = el.querySelector(".name")?.textContent?.trim();
    const price = el.querySelector(".prc")?.textContent?.trim();
    const oldPrice = el.querySelector(".old")?.textContent?.trim();
    const rating = el.querySelector(".stars._s")?.textContent?.trim();
    if (name) items.push({ name, price, oldPrice, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
