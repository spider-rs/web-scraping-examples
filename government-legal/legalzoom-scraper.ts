/**
 * LegalZoom Scraper
 *
 * Extract legal service offerings, pricing tiers, business formation info, and cus
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx legalzoom-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.legalzoom.com/business/business-formation/llc-overview.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll("[data-testid='pricing-card']").forEach(el => {
    const name = el.querySelector(".plan-name")?.textContent?.trim();
    const price = el.querySelector(".plan-price")?.textContent?.trim();
    const features = [];
    el.querySelectorAll(".feature-list li").forEach(f => features.push(f.textContent?.trim()));
    if (name) plans.push({ name, price, features: features.slice(0, 5) });
  });
  return JSON.stringify({ total: plans.length, plans });
})()`);

console.log(JSON.parse(data));
await spider.close();
