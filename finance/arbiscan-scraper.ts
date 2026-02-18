/**
 * Arbiscan Scraper
 *
 * Extract Arbitrum L2 transactions, bridge activity, smart contract data, and roll
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx arbiscan-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://arbiscan.io/txs");
await page.content();

const data = await page.extractFields({
  txHashes: "table tbody tr td:nth-child(2) a",
  blocks: "table tbody tr td:nth-child(4) a",
  fromAddresses: "table tbody tr td:nth-child(7) a",
  toAddresses: "table tbody tr td:nth-child(9) a",
  values: "table tbody tr td:nth-child(10)",
  fees: "table tbody tr td:nth-child(11)",
});

console.log(data);
await spider.close();
