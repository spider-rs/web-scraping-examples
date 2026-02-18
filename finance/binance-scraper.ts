/**
 * Binance Scraper
 *
 * Capture cryptocurrency trading pairs, order book depth, and 24-hour market stati
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx binance-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.binance.com/en/markets/overview");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const pairs = [];
  document.querySelectorAll("[class*='market-table'] tbody tr").forEach(el => {
    const name = el.querySelector("td:nth-child(1)")?.textContent?.trim();
    const price = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const change = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const volume = el.querySelector("td:nth-child(5)")?.textContent?.trim();
    if (name) pairs.push({ name, price, change, volume });
  });
  return JSON.stringify({ total: pairs.length, pairs: pairs.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
