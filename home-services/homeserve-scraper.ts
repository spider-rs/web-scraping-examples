/**
 * HomeServe Scraper
 *
 * Extract home warranty plan details, coverage options, repair service pricing, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx homeserve-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.homeserve.com/sc/plans");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll(".plan-card, .product-card").forEach(el => {
    const name = el.querySelector("h3, .plan-title")?.textContent?.trim();
    const price = el.querySelector(".plan-price, .monthly-cost")?.textContent?.trim();
    const coverage = el.querySelector(".plan-coverage, .coverage-summary")?.textContent?.trim();
    const fee = el.querySelector(".service-fee")?.textContent?.trim();
    if (name) plans.push({ name, price, coverage, fee });
  });
  return JSON.stringify({ total: plans.length, plans: plans.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
