/**
 * Macrotrends Scraper
 *
 * Download long-term historical financial data, revenue charts, and macroeconomic 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx macrotrends-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.macrotrends.net/stocks/charts/AAPL/apple/revenue");
await page.content();

const data = await page.evaluate(`(() => {
  const rows = [];
  document.querySelectorAll("#style-1 table tbody tr").forEach(el => {
    const date = el.querySelector("td:nth-child(1)")?.textContent?.trim();
    const revenue = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    if (date && revenue) rows.push({ date, revenue });
  });
  return JSON.stringify({ total: rows.length, data: rows.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
