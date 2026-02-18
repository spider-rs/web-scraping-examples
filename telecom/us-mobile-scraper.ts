/**
 * US Mobile Scraper
 *
 * Extract customizable wireless plan builders, per-line pricing, network choice op
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx us-mobile-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.usmobile.com/plans");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll(".plan-card, [data-testid='plan-option']").forEach(el => {
    const name = el.querySelector("h2, h3, .plan-name")?.textContent?.trim();
    const price = el.querySelector(".plan-price, .monthly-price")?.textContent?.trim();
    const data = el.querySelector(".data-amount, .plan-data")?.textContent?.trim();
    const network = el.querySelector(".network-badge, .carrier-name")?.textContent?.trim();
    const perks = [];
    el.querySelectorAll(".perk-item, .included-perk").forEach(p => {
      const text = p.textContent?.trim();
      if (text) perks.push(text);
    });
    if (name) plans.push({ name, price, data, network, perks: perks.slice(0, 4) });
  });
  return JSON.stringify({ total: plans.length, plans: plans.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
