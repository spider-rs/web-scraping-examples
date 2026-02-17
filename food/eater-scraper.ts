/**
 * Eater Scraper
 *
 * Extract restaurant reviews, city dining guides, heat maps, and food industry new
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx eater-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.eater.com/maps/best-new-restaurants-nyc");
await page.content();

const data = await page.evaluate(`(() => {
  const restaurants = [];
  document.querySelectorAll(".c-mapstack__card").forEach(el => {
    const name = el.querySelector(".c-mapstack__card-hed")?.textContent?.trim();
    const description = el.querySelector(".c-mapstack__card-dek")?.textContent?.trim();
    const address = el.querySelector(".c-mapstack__address")?.textContent?.trim();
    if (name) restaurants.push({ name, description: description?.slice(0, 200), address });
  });
  return JSON.stringify({ total: restaurants.length, restaurants: restaurants.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
