/**
 * Heroku Scraper
 *
 * Extract add-on marketplace listings, pricing tiers, documentation content, and p
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx heroku-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://elements.heroku.com/addons");
await page.content();

const data = await page.evaluate(`(() => {
  const addons = [];
  document.querySelectorAll(".addon-list-item, [class*='addon-card']").forEach(el => {
    const name = el.querySelector("h3, [class*='name']")?.textContent?.trim();
    const desc = el.querySelector("p, [class*='description']")?.textContent?.trim();
    const category = el.querySelector("[class*='category']")?.textContent?.trim();
    const price = el.querySelector("[class*='price']")?.textContent?.trim();
    if (name) addons.push({ name, desc, category, price });
  });
  return JSON.stringify({ total: addons.length, addons: addons.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
