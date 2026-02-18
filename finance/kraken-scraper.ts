/**
 * Kraken Scraper
 *
 * Obtain crypto trading volumes, staking rewards, margin rates, and futures data f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kraken-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.kraken.com/prices");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const assets = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const name = el.querySelector("td:nth-child(1) a")?.textContent?.trim();
    const price = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const change = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const marketCap = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    if (name) assets.push({ name, price, change, marketCap });
  });
  return JSON.stringify({ total: assets.length, assets: assets.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
