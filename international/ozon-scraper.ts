/**
 * Ozon Scraper
 *
 * Extract product listings, pricing in RUB, seller ratings, and express delivery d
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ozon-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ozon.ru/category/noutbuki-15692/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll("[data-widget='searchResultsV2'] .widget-search-result-container > div").forEach(el => {
    const name = el.querySelector("a span.tsBody500Medium")?.textContent?.trim();
    const price = el.querySelector("span.tsHeadline500Medium")?.textContent?.trim();
    const rating = el.querySelector("[data-widget='miniRating']")?.textContent?.trim();
    if (name) items.push({ name, price, rating });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
