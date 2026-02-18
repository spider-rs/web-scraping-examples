/**
 * ClickUp Scraper
 *
 * Extract productivity features, pricing plans, template data, and integration lis
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx clickup-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://clickup.com/pricing");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const plans = [];
  document.querySelectorAll("[data-testid='pricing-card'], .pricing-card").forEach(el => {
    const name = el.querySelector("h3, .pricing-card__name")?.textContent?.trim();
    const price = el.querySelector(".pricing-card__price, [data-testid='price']")?.textContent?.trim();
    const features = [];
    el.querySelectorAll(".pricing-card__feature, [data-testid='feature']").forEach(f => {
      const text = f.textContent?.trim();
      if (text) features.push(text);
    });
    if (name) plans.push({ name, price, features: features.slice(0, 8) });
  });
  return JSON.stringify({ total: plans.length, plans });
})()`);

console.log(JSON.parse(data));
await spider.close();
