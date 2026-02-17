/**
 * Blockchain.com Scraper
 *
 * Extract Bitcoin blockchain statistics, wallet transaction data, mining pool metr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx blockchain-com-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.blockchain.com/explorer");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const blocks = [];
  document.querySelectorAll("table tbody tr, .block-row").forEach(el => {
    const height = el.querySelector("td:nth-child(1) a, .block-height")?.textContent?.trim();
    const time = el.querySelector("td:nth-child(2), .block-time")?.textContent?.trim();
    const txCount = el.querySelector("td:nth-child(3), .tx-count")?.textContent?.trim();
    const size = el.querySelector("td:nth-child(4), .block-size")?.textContent?.trim();
    if (height) blocks.push({ height, time, txCount, size });
  });
  return JSON.stringify({ total: blocks.length, blocks: blocks.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
