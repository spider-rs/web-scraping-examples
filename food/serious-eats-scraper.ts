/**
 * Serious Eats Scraper
 *
 * Extract science-driven recipes, technique guides, equipment reviews, and food la
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx serious-eats-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.seriouseats.com/the-best-slow-cooked-italian-american-tomato-sauce-red-sauce-recipe");
await page.content();

const data = await page.evaluate(`(() => {
  const recipe = {
    title: document.querySelector("h1.heading__title")?.textContent?.trim(),
    author: document.querySelector(".mntl-attribution__item-name")?.textContent?.trim(),
    rating: document.querySelector("#mntl-recipe-review-bar__rating_1-0")?.textContent?.trim(),
    totalTime: document.querySelector(".mntl-recipe-details__value")?.textContent?.trim(),
    ingredients: [],
  };
  document.querySelectorAll(".mntl-structured-ingredients__list-item").forEach(el => {
    recipe.ingredients.push(el.textContent?.trim());
  });
  return JSON.stringify(recipe);
})()`);

console.log(JSON.parse(data));
await spider.close();
