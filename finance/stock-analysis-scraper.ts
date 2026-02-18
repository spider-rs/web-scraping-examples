/**
 * Stock Analysis Scraper
 *
 * Retrieve comprehensive stock profiles, financial statements, and IPO calendar da
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx stock-analysis-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://stockanalysis.com/stocks/aapl/financials/");
await page.content();

const data = await page.evaluate(`(() => {
  const rows = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const label = el.querySelector("td:nth-child(1)")?.textContent?.trim();
    const values = [];
    el.querySelectorAll("td:not(:first-child)").forEach(td => {
      values.push(td?.textContent?.trim());
    });
    if (label) rows.push({ label, values: values.slice(0, 5) });
  });
  return JSON.stringify({ total: rows.length, financials: rows.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
