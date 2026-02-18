/**
 * Investing.com Scraper
 *
 * Scrapes most active stocks from Investing.com platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finance/investing-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.investing.com/equities/most-active-stocks");
await page.content();
const data = await page.evaluate(`(() => {
  const stocks = Array.from(document.querySelectorAll('tr[data-test="stock-row"]')).map(el => ({
    symbol: el.querySelector('[data-test="symbol"]')?.textContent?.trim(),
    name: el.querySelector('[data-test="name"]')?.textContent?.trim(),
    price: el.querySelector('[data-test="price"]')?.textContent?.trim(),
    change: el.querySelector('[data-test="change"]')?.textContent?.trim(),
    volume: el.querySelector('[data-test="volume"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ stocks });
})()`);
console.log(JSON.parse(data));
await spider.close();
