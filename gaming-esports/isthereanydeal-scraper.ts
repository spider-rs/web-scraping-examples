/**
 * IsThereAnyDeal Scraper
 *
 * Extract game deal alerts, price comparisons, historical lowest prices, and bundl
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx isthereanydeal-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://isthereanydeal.com/game/eldenring/info/");
await page.content();

const data = await page.evaluate(`(() => {
  const title = document.querySelector("h1")?.textContent?.trim();
  const deals = [];
  document.querySelectorAll(".deals-row").forEach(el => {
    const store = el.querySelector(".store-name")?.textContent?.trim();
    const price = el.querySelector(".price")?.textContent?.trim();
    const discount = el.querySelector(".discount")?.textContent?.trim();
    if (store) deals.push({ store, price, discount });
  });
  const historicalLow = document.querySelector(".historical-low .price")?.textContent?.trim();
  return JSON.stringify({ title, deals: deals.slice(0, 8), historicalLow });
})()`);

console.log(JSON.parse(data));
await spider.close();
