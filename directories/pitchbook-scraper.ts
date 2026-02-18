/**
 * PitchBook Scraper
 *
 * Extract private market data, venture capital deal flow, fund performance metrics
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pitchbook-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://pitchbook.com/newsletter/the-10-biggest-us-vc-deals");
await page.content(10000);

const data = await page.extractFields({
  title: "h1",
  deals: ".deal-card h3",
  amounts: ".deal-card .amount",
  investors: ".deal-card .investors",
  description: ".article-body p",
  date: ".article-date",
  author: ".article-author",
});

console.log(data);
await spider.close();
