/**
 * Craigslist Scraper
 *
 * Extract classified listings, pricing, location data, and seller contact info fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx craigslist-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://sfbay.craigslist.org/search/sss?query=bicycle");
await page.content();

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".cl-static-search-result").forEach(el => {
    const title = el.querySelector(".title")?.textContent?.trim();
    const price = el.querySelector(".price")?.textContent?.trim();
    const location = el.querySelector(".location")?.textContent?.trim();
    if (title) items.push({ title, price, location });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
