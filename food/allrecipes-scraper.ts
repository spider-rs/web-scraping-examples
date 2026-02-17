/**
 * AllRecipes Scraper
 *
 * Scrapes Asian cuisine recipes from AllRecipes platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx food/allrecipes-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.allrecipes.com/recipes/233/world-cuisine/asian/");
await page.content();
const data = await page.evaluate(`(() => {
  const recipes = Array.from(document.querySelectorAll('[data-test="recipe-card"]')).map(el => ({
    title: el.querySelector('[data-test="recipe-title"]')?.textContent?.trim(),
    prepTime: el.querySelector('[data-test="prep-time"]')?.textContent?.trim(),
    cookTime: el.querySelector('[data-test="cook-time"]')?.textContent?.trim(),
    rating: el.querySelector('[data-test="rating"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ recipes });
})()`);
console.log(JSON.parse(data));
await spider.close();
