/**
 * TradingView Scraper
 *
 * Capture technical analysis charts, stock screener data, and community trading id
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tradingview-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.tradingview.com/markets/stocks-usa/market-movers-most-volatile/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const stocks = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const ticker = el.querySelector("td:nth-child(1) a")?.textContent?.trim();
    const price = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const change = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const volume = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    const rating = el.querySelector("td:nth-child(5)")?.textContent?.trim();
    if (ticker) stocks.push({ ticker, price, change, volume, rating });
  });
  return JSON.stringify({ total: stocks.length, stocks: stocks.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
