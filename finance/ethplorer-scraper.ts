/**
 * Ethplorer Scraper
 *
 * Extract ERC-20 token analytics, wallet portfolio breakdowns, top holder lists, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ethplorer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://ethplorer.io/top");
await page.content(10000);

const data = await page.extractFields({
  pageTitle: "h1",
  topTokens: "table tbody tr td:nth-child(2) a",
  prices: "table tbody tr td:nth-child(3)",
  marketCaps: "table tbody tr td:nth-child(4)",
  holders: "table tbody tr td:nth-child(5)",
  transfers: "table tbody tr td:nth-child(6)",
});

console.log(data);
await spider.close();
