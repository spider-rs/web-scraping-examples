/**
 * Interactive Brokers Scraper
 *
 * Retrieve commission schedules, margin rates, global market access details, and p
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx interactive-brokers-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.interactivebrokers.com/en/trading/commissions-stocks.php");
await page.content();

const data = await page.evaluate(`(() => {
  const rows = [];
  document.querySelectorAll("table.table tbody tr").forEach(el => {
    const region = el.querySelector("td:nth-child(1)")?.textContent?.trim();
    const fixedRate = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const tieredRate = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const minTrade = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    if (region) rows.push({ region, fixedRate, tieredRate, minTrade });
  });
  return JSON.stringify({ total: rows.length, commissions: rows.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
