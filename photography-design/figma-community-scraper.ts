/**
 * Figma Community Scraper
 *
 * Extract community files, plugin details, duplicate counts, and creator profiles 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx figma-community-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.figma.com/community/search?resource_type=mixed&sort_by=popular&query=dashboard");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const files = [];
  document.querySelectorAll("[data-testid='community-resource-card']").forEach(el => {
    const title = el.querySelector("[data-testid='resource-card-title']")?.textContent?.trim();
    const creator = el.querySelector("[data-testid='resource-card-creator']")?.textContent?.trim();
    const likes = el.querySelector("[data-testid='resource-card-likes']")?.textContent?.trim();
    const duplicates = el.querySelector("[data-testid='resource-card-duplicates']")?.textContent?.trim();
    if (title) files.push({ title, creator, likes, duplicates });
  });
  return JSON.stringify({ total: files.length, files: files.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
