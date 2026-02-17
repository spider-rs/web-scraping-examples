/**
 * MyFitnessPal Scraper
 *
 * Extract food nutrition data, calorie counts, macronutrient breakdowns, and exerc
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx myfitnesspal-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.myfitnesspal.com/food/search?search=chicken+breast");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const foods = [];
  document.querySelectorAll(".food-search-result, [class*='SearchResult']").forEach(el => {
    const name = el.querySelector("[class*='Name'], .food-name")?.textContent?.trim();
    const calories = el.querySelector("[class*='Calories'], .calories")?.textContent?.trim();
    const brand = el.querySelector("[class*='Brand'], .brand")?.textContent?.trim();
    if (name) foods.push({ name, calories, brand });
  });
  return JSON.stringify({ total: foods.length, foods: foods.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
