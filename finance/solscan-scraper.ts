/**
 * Solscan Scraper
 *
 * Extract Solana blockchain transactions, SPL token data, NFT collection stats, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx solscan-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://solscan.io/");
await page.content(10000);

const data = await page.extractFields({
  solPrice: ".sol-price, [data-testid='sol-price']",
  tps: ".tps-value, [data-testid='tps']",
  latestBlocks: "table tbody tr td:nth-child(1) a",
  latestTxs: ".tx-table tbody tr td:nth-child(1) a",
  validators: ".validator-count",
  epochInfo: ".epoch-info",
});

console.log(data);
await spider.close();
