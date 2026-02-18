/**
 * Fixr Scraper
 *
 * Extract home renovation cost guides, material pricing breakdowns, labor estimate
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx fixr-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.fixr.com/costs/bathroom-remodel");
await page.content();

const data = await page.evaluate(`(() => {
  const costs = [];
  document.querySelectorAll(".cost-item, .price-breakdown-row").forEach(el => {
    const item = el.querySelector(".cost-label, .item-name")?.textContent?.trim();
    const avg = el.querySelector(".cost-average, .avg-price")?.textContent?.trim();
    const low = el.querySelector(".cost-low, .low-price")?.textContent?.trim();
    const high = el.querySelector(".cost-high, .high-price")?.textContent?.trim();
    if (item) costs.push({ item, avg, low, high });
  });
  return JSON.stringify({
    project: document.querySelector("h1")?.textContent?.trim(),
    total: costs.length,
    costs: costs.slice(0, 15),
  });
})()`);

console.log(JSON.parse(data));
await spider.close();
