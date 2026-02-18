/**
 * CoinGecko Scraper
 *
 * Scrapes cryptocurrency price data from CoinGecko.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finance/coingecko-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.coingecko.com/");
await page.content();
const data = await page.evaluate(`(() => {
  const coins = Array.from(document.querySelectorAll('tr[data-test="coin"]')).map(el => ({
    name: el.querySelector('[data-test="coin-name"]')?.textContent?.trim(),
    symbol: el.querySelector('[data-test="symbol"]')?.textContent?.trim(),
    price: el.querySelector('[data-test="price"]')?.textContent?.trim(),
    change24h: el.querySelector('[data-test="change-24h"]')?.textContent?.trim(),
    marketCap: el.querySelector('[data-test="market-cap"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ coins });
})()`);
console.log(JSON.parse(data));
await spider.close();
