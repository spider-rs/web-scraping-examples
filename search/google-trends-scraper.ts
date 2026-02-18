/**
 * Google Trends Scraper
 *
 * Extract trending search topics, interest over time, regional breakdowns, and rel
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-trends-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://trends.google.com/trending?geo=US");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const trends = [];
  document.querySelectorAll("[data-testid='trending-item'], .feed-list-wrapper tr").forEach(el => {
    const topic = el.querySelector(".title span, td:nth-child(2)")?.textContent?.trim();
    const volume = el.querySelector(".search-count-title, td:nth-child(3)")?.textContent?.trim();
    const started = el.querySelector(".trending-source, td:nth-child(4)")?.textContent?.trim();
    if (topic) trends.push({ topic, volume, started });
  });
  return JSON.stringify({ total: trends.length, trends: trends.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
