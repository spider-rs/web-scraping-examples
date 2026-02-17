/**
 * Yahoo Finance Scraper
 *
 * Scrapes most active stocks from Yahoo Finance.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finance/yahoo-finance-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://finance.yahoo.com/most-active/");
await page.content();
const data = await page.evaluate(`(() => {
  const stocks = Array.from(document.querySelectorAll('tr[data-test="row"]')).map(el => ({
    symbol: el.querySelector('[data-test="symbol"]')?.textContent?.trim(),
    price: el.querySelector('[data-test="price"]')?.textContent?.trim(),
    change: el.querySelector('[data-test="change"]')?.textContent?.trim(),
    changePercent: el.querySelector('[data-test="changePercent"]')?.textContent?.trim(),
    volume: el.querySelector('[data-test="volume"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ stocks });
})()`);
console.log(JSON.parse(data));
await spider.close();
