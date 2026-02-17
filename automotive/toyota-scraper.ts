/**
 * Toyota Scraper
 *
 * Extract Toyota vehicle lineup, pricing tiers, feature comparisons, dealer invent
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx toyota-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.toyota.com/camry");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const trims = [];
  document.querySelectorAll("[class*='trim-card'], [class*='grade-card']").forEach(el => {
    const name = el.querySelector("[class*='trim-name'], h3")?.textContent?.trim();
    const price = el.querySelector("[class*='price'], [class*='msrp']")?.textContent?.trim();
    const mpg = el.querySelector("[class*='mpg']")?.textContent?.trim();
    const hp = el.querySelector("[class*='horsepower']")?.textContent?.trim();
    if (name) trims.push({ name, price, mpg, hp });
  });
  return JSON.stringify({ total: trims.length, trims: trims.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
