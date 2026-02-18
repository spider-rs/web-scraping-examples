/**
 * PolygonScan Scraper
 *
 * Extract Polygon network transactions, token transfers, smart contract interactio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx polygonscan-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://polygonscan.com/txs");
await page.content();

const data = await page.evaluate(`(() => {
  const txs = [];
  document.querySelectorAll("table tbody tr").forEach(el => {
    const hash = el.querySelector("td:nth-child(2) a")?.textContent?.trim();
    const block = el.querySelector("td:nth-child(4) a")?.textContent?.trim();
    const from = el.querySelector("td:nth-child(7) a")?.textContent?.trim();
    const to = el.querySelector("td:nth-child(9) a")?.textContent?.trim();
    const value = el.querySelector("td:nth-child(10)")?.textContent?.trim();
    if (hash) txs.push({ hash, block, from, to, value });
  });
  return JSON.stringify({ total: txs.length, transactions: txs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
