/**
 * AT&T Scraper
 *
 * Extract wireless and fiber plan pricing, bundle offers, device deals, and networ
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx att-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.att.com/plans/wireless/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll("[data-testid='plan-card'], .plan-tile").forEach(el => {
    const name = el.querySelector("h2, h3, .plan-title")?.textContent?.trim();
    const price = el.querySelector(".plan-price, [data-testid='price']")?.textContent?.trim();
    const data = el.querySelector(".data-allowance, [data-testid='data']")?.textContent?.trim();
    const perks = el.querySelector(".plan-perks, [data-testid='perks']")?.textContent?.trim();
    if (name) plans.push({ name, price, data, perks });
  });
  return JSON.stringify({ total: plans.length, plans: plans.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
