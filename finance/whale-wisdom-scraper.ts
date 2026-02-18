/**
 * Whale Wisdom Scraper
 *
 * Monitor institutional 13F filings, hedge fund positions, and portfolio allocatio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx whale-wisdom-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://whalewisdom.com/filer/berkshire-hathaway-inc");
await page.content();

const data = await page.evaluate(`(() => {
  const holdings = [];
  document.querySelectorAll("#current_holdings_table tbody tr").forEach(el => {
    const stock = el.querySelector("td:nth-child(1) a")?.textContent?.trim();
    const shares = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const value = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    const weight = el.querySelector("td:nth-child(5)")?.textContent?.trim();
    const change = el.querySelector("td:nth-child(6)")?.textContent?.trim();
    if (stock) holdings.push({ stock, shares, value, weight, change });
  });
  return JSON.stringify({ total: holdings.length, holdings: holdings.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
