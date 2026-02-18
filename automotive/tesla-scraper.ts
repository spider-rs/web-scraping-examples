/**
 * Tesla Scraper
 *
 * Extract Tesla vehicle configurations, pricing, range estimates, inventory listin
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tesla-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.tesla.com/model3");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const models = [];
  document.querySelectorAll("[class*='group--container'], [class*='variant']").forEach(el => {
    const name = el.querySelector("h2, [class*='title']")?.textContent?.trim();
    const price = el.querySelector("[class*='price'], [class*='finance']")?.textContent?.trim();
    const range = el.querySelector("[class*='range']")?.textContent?.trim();
    const speed = el.querySelector("[class*='top-speed']")?.textContent?.trim();
    const accel = el.querySelector("[class*='acceleration']")?.textContent?.trim();
    if (name) models.push({ name, price, range, speed, accel });
  });
  return JSON.stringify({ total: models.length, models: models.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
