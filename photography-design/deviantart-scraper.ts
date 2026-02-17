/**
 * DeviantArt Scraper
 *
 * Extract artwork submissions, artist profiles, favorite counts, and comment threa
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx deviantart-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.deviantart.com/search?q=digital+painting");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const artworks = [];
  document.querySelectorAll("[data-hook='deviation_std_thumb']").forEach(el => {
    const title = el.querySelector("[data-hook='deviation_title']")?.textContent?.trim();
    const artist = el.querySelector("[data-hook='deviation_artist']")?.textContent?.trim();
    const img = el.querySelector("img")?.getAttribute("src");
    if (title) artworks.push({ title, artist, img });
  });
  return JSON.stringify({ total: artworks.length, artworks: artworks.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
