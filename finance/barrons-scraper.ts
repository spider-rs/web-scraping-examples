/**
 * 
 *
 * 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx barrons-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.barrons.com/market-data/stocks/most-active");
await page.content();

const data = await page.evaluate(`(() => {
  const stocks = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const name = el.querySelector("td:nth-child(1) a")?.textContent?.trim();
    const price = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const change = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const volume = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    if (name) stocks.push({ name, price, change, volume });
  });
  return JSON.stringify({ total: stocks.length, stocks: stocks.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
