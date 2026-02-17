/**
 * CoinMarketCap Scraper
 *
 * Scrapes cryptocurrency rankings from CoinMarketCap.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finance/coinmarketcap-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://coinmarketcap.com/");
await page.content();
const data = await page.evaluate(`(() => {
  const coins = Array.from(document.querySelectorAll('tr[data-test="coin-table-row"]')).map(el => ({
    rank: el.querySelector('[data-test="rank"]')?.textContent?.trim(),
    name: el.querySelector('[data-test="coin-name"]')?.textContent?.trim(),
    price: el.querySelector('[data-test="price"]')?.textContent?.trim(),
    change24h: el.querySelector('[data-test="change-24h"]')?.textContent?.trim(),
    marketCap: el.querySelector('[data-test="market-cap"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ coins });
})()`);
console.log(JSON.parse(data));
await spider.close();
