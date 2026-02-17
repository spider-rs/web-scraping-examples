/**
 * SmugMug Scraper
 *
 * Extract photo galleries, album structures, photographer portfolios, and print pr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx smugmug-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.smugmug.com/gallery-collection/");
await page.content();

const data = await page.evaluate(`(() => {
  const galleries = [];
  document.querySelectorAll(".sm-gallery-tile").forEach(el => {
    const title = el.querySelector(".sm-tile-title")?.textContent?.trim();
    const count = el.querySelector(".sm-tile-count")?.textContent?.trim();
    const img = el.querySelector("img")?.getAttribute("src");
    if (title) galleries.push({ title, count, img });
  });
  return JSON.stringify({ total: galleries.length, galleries: galleries.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
