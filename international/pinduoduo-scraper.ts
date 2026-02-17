/**
 * Pinduoduo Scraper
 *
 * Extract group-buy listings, team pricing, product data, and social commerce metr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pinduoduo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://mobile.yangkeduo.com/search_result.html?search_key=phone+case");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".search-result-item").forEach(el => {
    const name = el.querySelector(".title-text")?.textContent?.trim();
    const price = el.querySelector(".price-text")?.textContent?.trim();
    const sales = el.querySelector(".sales-text")?.textContent?.trim();
    if (name) items.push({ name, price, sales });
  });
  return JSON.stringify({ total: items.length, items: items.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
