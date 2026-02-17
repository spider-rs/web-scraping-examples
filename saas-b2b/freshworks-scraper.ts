/**
 * Freshworks Scraper
 *
 * Extract product suite details, pricing tiers, feature comparisons, and marketpla
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx freshworks-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.freshworks.com/crm/pricing/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll(".pricing-card, [data-testid='pricing-plan']").forEach(el => {
    const name = el.querySelector("h3, .plan-name")?.textContent?.trim();
    const price = el.querySelector(".price-value, .plan-price")?.textContent?.trim();
    const features = [];
    el.querySelectorAll("li, .feature-item").forEach(f => {
      const text = f.textContent?.trim();
      if (text) features.push(text);
    });
    if (name) plans.push({ name, price, features: features.slice(0, 8) });
  });
  return JSON.stringify({ total: plans.length, plans });
})()`);

console.log(JSON.parse(data));
await spider.close();
