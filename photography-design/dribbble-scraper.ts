/**
 * Dribbble Scraper
 *
 * Extract design shots, designer profiles, like counts, and project tags from Drib
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dribbble-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://dribbble.com/shots/popular");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const shots = [];
  document.querySelectorAll("[data-testid='shot-thumbnail']").forEach(el => {
    const title = el.querySelector("[data-testid='shot-title']")?.textContent?.trim();
    const designer = el.querySelector("[data-testid='shot-designer']")?.textContent?.trim();
    const likes = el.querySelector("[data-testid='shot-likes']")?.textContent?.trim();
    const img = el.querySelector("img")?.getAttribute("src");
    if (title) shots.push({ title, designer, likes, img });
  });
  return JSON.stringify({ total: shots.length, shots: shots.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
