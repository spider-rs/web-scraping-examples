/**
 * Medicare Scraper
 *
 * Extract Medicare plan comparisons, provider directories, drug formularies, and c
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx medicare-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.medicare.gov/plan-compare/#/?fips=11001&year=2026");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll(".plan-card").forEach(el => {
    const name = el.querySelector(".plan-name")?.textContent?.trim();
    const premium = el.querySelector(".monthly-premium")?.textContent?.trim();
    const rating = el.querySelector(".star-rating")?.getAttribute("aria-label");
    if (name) plans.push({ name, premium, rating });
  });
  return JSON.stringify({ total: plans.length, plans: plans.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
