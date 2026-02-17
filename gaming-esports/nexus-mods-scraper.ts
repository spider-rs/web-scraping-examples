/**
 * Nexus Mods Scraper
 *
 * Extract game mod listings, download counts, endorsements, and mod descriptions f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx nexus-mods-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.nexusmods.com/skyrimspecialedition/mods/trendingmods/");
await page.content();

const data = await page.evaluate(`(() => {
  const mods = [];
  document.querySelectorAll(".mod-tile").forEach(el => {
    const title = el.querySelector(".tile-name a")?.textContent?.trim();
    const author = el.querySelector(".author a")?.textContent?.trim();
    const downloads = el.querySelector(".mod-dl-count")?.textContent?.trim();
    const endorsements = el.querySelector(".mod-endorse-count")?.textContent?.trim();
    const link = el.querySelector(".tile-name a")?.getAttribute("href");
    if (title) mods.push({ title, author, downloads, endorsements, link });
  });
  return JSON.stringify({ total: mods.length, mods: mods.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
