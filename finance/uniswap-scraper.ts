/**
 * Uniswap Scraper
 *
 * Extract decentralized exchange trading pools, liquidity positions, swap prices, 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx uniswap-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://app.uniswap.org/explore/pools");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const pools = [];
  document.querySelectorAll("table tbody tr, [data-testid='pool-row']").forEach(el => {
    const pair = el.querySelector("td:nth-child(1), .pool-pair")?.textContent?.trim();
    const tvl = el.querySelector("td:nth-child(2), .pool-tvl")?.textContent?.trim();
    const volume = el.querySelector("td:nth-child(3), .pool-volume")?.textContent?.trim();
    const fee = el.querySelector("td:nth-child(4), .pool-fee")?.textContent?.trim();
    if (pair) pools.push({ pair, tvl, volume, fee });
  });
  return JSON.stringify({ total: pools.length, pools: pools.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
