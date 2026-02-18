/**
 * Coinbase Scraper
 *
 * Fetch cryptocurrency prices, asset profiles, staking yields, and market trend da
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx coinbase-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.coinbase.com/explore");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const assets = [];
  document.querySelectorAll("[data-testid='asset-row']").forEach(el => {
    const name = el.querySelector("[data-testid='asset-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='asset-price']")?.textContent?.trim();
    const change = el.querySelector("[data-testid='asset-change']")?.textContent?.trim();
    if (name) assets.push({ name, price, change });
  });
  return JSON.stringify({ total: assets.length, assets: assets.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
