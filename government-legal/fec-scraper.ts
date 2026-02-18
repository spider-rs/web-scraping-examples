/**
 * FEC Scraper
 *
 * Extract campaign finance reports, candidate filings, PAC contributions, and disb
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fec-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.fec.gov/data/candidates/senate/?is_active_candidate=true");
await page.content();

const data = await page.extractFields({
  name: "table tbody tr td:first-child a",
  party: "table tbody tr td:nth-child(2)",
  state: "table tbody tr td:nth-child(3)",
  receipts: "table tbody tr td:nth-child(5)",
});

console.log(data);
await spider.close();
