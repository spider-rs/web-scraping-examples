/**
 * OpenInsider Scraper
 *
 * Track SEC insider buying and selling transactions, cluster buys, and executive s
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx openinsider-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://openinsider.com/latest-insider-trading");
await page.content();

const data = await page.evaluate(`(() => {
  const trades = [];
  document.querySelectorAll("table.tinytable tbody tr").forEach(el => {
    const filingDate = el.querySelector("td:nth-child(2) a")?.textContent?.trim();
    const ticker = el.querySelector("td:nth-child(4) a")?.textContent?.trim();
    const insiderName = el.querySelector("td:nth-child(5) a")?.textContent?.trim();
    const title = el.querySelector("td:nth-child(6)")?.textContent?.trim();
    const tradeType = el.querySelector("td:nth-child(7)")?.textContent?.trim();
    const price = el.querySelector("td:nth-child(8)")?.textContent?.trim();
    const value = el.querySelector("td:nth-child(11)")?.textContent?.trim();
    if (ticker) trades.push({ filingDate, ticker, insiderName, title, tradeType, price, value });
  });
  return JSON.stringify({ total: trades.length, trades: trades.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
