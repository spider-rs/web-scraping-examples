/**
 * Token Terminal Scraper
 *
 * Analyze protocol revenue metrics, P/S ratios, and token fundamental data from To
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx token-terminal-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://tokenterminal.com/leaderboards/top-protocols-revenue");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const protocols = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const name = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const revenue = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const fees = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    const psRatio = el.querySelector("td:nth-child(5)")?.textContent?.trim();
    if (name) protocols.push({ name, revenue, fees, psRatio });
  });
  return JSON.stringify({ total: protocols.length, protocols: protocols.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
