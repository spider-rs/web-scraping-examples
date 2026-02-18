/**
 * HelloFresh Scraper
 *
 * Extract weekly meal kit menus, nutritional info, pricing plans, and recipe cards
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hellofresh-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.hellofresh.com/menus");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const meals = [];
  document.querySelectorAll("[data-test-id='recipe-card']").forEach(el => {
    const name = el.querySelector("[data-test-id='recipe-card-title']")?.textContent?.trim();
    const tags = el.querySelector("[data-test-id='recipe-card-tags']")?.textContent?.trim();
    const time = el.querySelector("[data-test-id='recipe-card-time']")?.textContent?.trim();
    const calories = el.querySelector("[data-test-id='recipe-card-calories']")?.textContent?.trim();
    if (name) meals.push({ name, tags, time, calories });
  });
  return JSON.stringify({ total: meals.length, meals: meals.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
