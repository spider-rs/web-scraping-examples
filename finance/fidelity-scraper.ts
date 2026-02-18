/**
 * Fidelity Scraper
 *
 * Extract mutual fund performance data, stock screener results, and retirement pla
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fidelity-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://fundresearch.fidelity.com/mutual-funds/summary/315911750");
await page.content(10000);

const data = await page.extractFields({
  fundName: "#fund-name",
  nav: ".nav-value",
  ytdReturn: ".ytd-return-value",
  expenseRatio: ".expense-ratio-value",
  rating: ".star-rating",
  minInvestment: ".minimum-investment-value",
});

console.log(data);
await spider.close();
