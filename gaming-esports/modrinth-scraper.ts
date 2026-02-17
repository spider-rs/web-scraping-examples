/**
 * Modrinth Scraper
 *
 * Extract open-source Minecraft mods, plugins, modpacks, and download statistics f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx modrinth-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://modrinth.com/mods?s=downloads");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const mods = [];
  document.querySelectorAll(".search-result").forEach(el => {
    const title = el.querySelector("h2, .title a")?.textContent?.trim();
    const description = el.querySelector(".description")?.textContent?.trim();
    const downloads = el.querySelector("[class*='download']")?.textContent?.trim();
    const author = el.querySelector("[class*='author'] a")?.textContent?.trim();
    const categories = [];
    el.querySelectorAll(".tag, .category").forEach(t => categories.push(t.textContent?.trim()));
    if (title) mods.push({ title, description, downloads, author, categories });
  });
  return JSON.stringify({ total: mods.length, mods: mods.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
