/**
 * Benzinga Scraper
 *
 * Pull real-time market news, analyst ratings changes, and pre-market movers data 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx benzinga-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.benzinga.com/analyst-ratings");
await page.content();

const data = await page.evaluate(`(() => {
  const ratings = [];
  document.querySelectorAll(".analyst-ratings-table tbody tr").forEach(el => {
    const ticker = el.querySelector(".ticker-cell a")?.textContent?.trim();
    const firm = el.querySelector(".firm-cell")?.textContent?.trim();
    const action = el.querySelector(".action-cell")?.textContent?.trim();
    const target = el.querySelector(".target-cell")?.textContent?.trim();
    const date = el.querySelector(".date-cell")?.textContent?.trim();
    if (ticker) ratings.push({ ticker, firm, action, target, date });
  });
  return JSON.stringify({ total: ratings.length, ratings: ratings.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
