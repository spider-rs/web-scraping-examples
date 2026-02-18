/**
 * T-Mobile Scraper
 *
 * Extract wireless plan details, device pricing, promotional offers, and coverage 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx t-mobile-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.t-mobile.com/cell-phone-plans");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll("[data-testid='plan-card'], .plan-card").forEach(el => {
    const name = el.querySelector("[data-testid='plan-name'], .plan-name")?.textContent?.trim();
    const price = el.querySelector("[data-testid='plan-price'], .plan-price")?.textContent?.trim();
    const data = el.querySelector("[data-testid='plan-data'], .plan-data")?.textContent?.trim();
    const features = [];
    el.querySelectorAll(".feature-item, li").forEach(f => {
      const text = f.textContent?.trim();
      if (text) features.push(text);
    });
    if (name) plans.push({ name, price, data, features: features.slice(0, 5) });
  });
  return JSON.stringify({ total: plans.length, plans: plans.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
