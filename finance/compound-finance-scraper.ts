/**
 * Compound Finance Scraper
 *
 * Extract DeFi lending interest rates, protocol governance data, COMP token distri
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx compound-finance-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://app.compound.finance/markets");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const markets = [];
  document.querySelectorAll("table tbody tr, .market-row").forEach(el => {
    const asset = el.querySelector("td:nth-child(1), .asset-name")?.textContent?.trim();
    const supplyApy = el.querySelector("td:nth-child(2), .supply-apy")?.textContent?.trim();
    const borrowApr = el.querySelector("td:nth-child(3), .borrow-apr")?.textContent?.trim();
    const totalSupply = el.querySelector("td:nth-child(4), .total-supply")?.textContent?.trim();
    if (asset) markets.push({ asset, supplyApy, borrowApr, totalSupply });
  });
  return JSON.stringify({ total: markets.length, markets: markets.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
