/**
 * Webull Scraper
 *
 * Mine stock screener results, earnings calendars, and real-time options flow data
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx webull-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.webull.com/quote/us/top-gainers");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const stocks = [];
  document.querySelectorAll(".table-body .table-row").forEach(el => {
    const name = el.querySelector(".stock-name")?.textContent?.trim();
    const ticker = el.querySelector(".stock-symbol")?.textContent?.trim();
    const price = el.querySelector(".stock-price")?.textContent?.trim();
    const change = el.querySelector(".stock-change")?.textContent?.trim();
    if (name) stocks.push({ name, ticker, price, change });
  });
  return JSON.stringify({ total: stocks.length, stocks: stocks.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
