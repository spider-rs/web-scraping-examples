/**
 * Kajabi Scraper
 *
 * Extract course builder platform features, marketing tools, pricing tiers, and su
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx kajabi-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://kajabi.com/pricing");

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll(".pricing-tier").forEach(el => {
    const name = el.querySelector("h3")?.textContent?.trim();
    const price = el.querySelector(".tier-price")?.textContent?.trim();
    const features = [];
    el.querySelectorAll(".tier-features li").forEach(f => {
      features.push(f.textContent?.trim());
    });
    if (name) plans.push({ name, price, features: features.slice(0, 8) });
  });
  return JSON.stringify({ total: plans.length, plans });
})()`);

console.log(JSON.parse(data));
await spider.close();
