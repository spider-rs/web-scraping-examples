/**
 * HubSpot Scraper
 *
 * Extract CRM features, pricing tiers, integration listings, and knowledge base co
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hubspot-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.hubspot.com/pricing/crm");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const tiers = [];
  document.querySelectorAll("[data-testid='pricing-card']").forEach(el => {
    const name = el.querySelector("h3, [data-testid='tier-name']")?.textContent?.trim();
    const price = el.querySelector("[data-testid='price-amount']")?.textContent?.trim();
    const features = [];
    el.querySelectorAll("[data-testid='feature-item']").forEach(f => {
      const text = f.textContent?.trim();
      if (text) features.push(text);
    });
    if (name) tiers.push({ name, price, features: features.slice(0, 8) });
  });
  return JSON.stringify({ total: tiers.length, tiers });
})()`);

console.log(JSON.parse(data));
await spider.close();
