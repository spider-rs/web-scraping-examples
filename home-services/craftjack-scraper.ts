/**
 * CraftJack Scraper
 *
 * Extract home service lead generation data, contractor profiles, project categori
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx craftjack-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.craftjack.com/services");
await page.content();

const data = await page.evaluate(`(() => {
  const categories = [];
  document.querySelectorAll(".service-category, .category-card").forEach(el => {
    const name = el.querySelector("h3, .category-title")?.textContent?.trim();
    const description = el.querySelector("p, .category-description")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    const subcategories = [];
    el.querySelectorAll(".subcategory, li").forEach(sub => {
      const text = sub.textContent?.trim();
      if (text) subcategories.push(text);
    });
    if (name) categories.push({ name, description, link, subcategories: subcategories.slice(0, 5) });
  });
  return JSON.stringify({ total: categories.length, categories: categories.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
