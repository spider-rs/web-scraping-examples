/**
 * Visible Scraper
 *
 * Extract unlimited wireless plan options, Party Pay group discounts, and Verizon 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx visible-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.visible.com/plans");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll("[data-testid='plan-card'], .plan-container").forEach(el => {
    const name = el.querySelector("h2, h3, .plan-title")?.textContent?.trim();
    const price = el.querySelector(".plan-price, [data-testid='price']")?.textContent?.trim();
    const features = [];
    el.querySelectorAll(".feature-item, .plan-feature li").forEach(f => {
      const text = f.textContent?.trim();
      if (text) features.push(text);
    });
    if (name) plans.push({ name, price, features: features.slice(0, 6) });
  });
  return JSON.stringify({ total: plans.length, plans: plans.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
