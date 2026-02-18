/**
 * Messari Scraper
 *
 * Retrieve crypto asset profiles, research reports, and governance metrics from Me
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx messari-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://messari.io/screener/all-assets-702BA45C");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const assets = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const name = el.querySelector("td:nth-child(2) a")?.textContent?.trim();
    const price = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const marketCap = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    const volume = el.querySelector("td:nth-child(5)")?.textContent?.trim();
    const sector = el.querySelector("td:nth-child(6)")?.textContent?.trim();
    if (name) assets.push({ name, price, marketCap, volume, sector });
  });
  return JSON.stringify({ total: assets.length, assets: assets.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
