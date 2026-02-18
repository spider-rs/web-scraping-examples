/**
 * Zacks Scraper
 *
 * Extract Zacks rank scores, earnings estimates, and stock recommendation data fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx zacks-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.zacks.com/stocks/buy-list");
await page.content();

const data = await page.evaluate(`(() => {
  const stocks = [];
  document.querySelectorAll("#buy_list_table tbody tr").forEach(el => {
    const ticker = el.querySelector("td:nth-child(1) a")?.textContent?.trim();
    const name = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const price = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const rank = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    if (ticker) stocks.push({ ticker, name, price, rank });
  });
  return JSON.stringify({ total: stocks.length, stocks: stocks.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
