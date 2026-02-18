/**
 * Vanguard Scraper
 *
 * Extract index fund performance data, ETF expense ratios, retirement plan options
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vanguard-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://investor.vanguard.com/investment-products/list/all");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const funds = [];
  document.querySelectorAll("table tbody tr, .product-list-row").forEach(el => {
    const name = el.querySelector("td:nth-child(1) a, .fund-name a")?.textContent?.trim();
    const ticker = el.querySelector("td:nth-child(2), .ticker")?.textContent?.trim();
    const expense = el.querySelector("td:nth-child(3), .expense-ratio")?.textContent?.trim();
    const price = el.querySelector("td:nth-child(4), .nav-price")?.textContent?.trim();
    if (name) funds.push({ name, ticker, expense, price });
  });
  return JSON.stringify({ total: funds.length, funds: funds.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
