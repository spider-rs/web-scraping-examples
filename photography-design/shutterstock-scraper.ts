/**
 * Shutterstock Scraper
 *
 * Extract stock image metadata, contributor profiles, licensing info, and keyword 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx shutterstock-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.shutterstock.com/search/technology");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const images = [];
  document.querySelectorAll("[data-automation='AssetGrids_GridItemContainer']").forEach(el => {
    const img = el.querySelector("img");
    const src = img?.getAttribute("src");
    const alt = img?.getAttribute("alt");
    const id = el.getAttribute("data-asset-id");
    if (src) images.push({ src, alt, id });
  });
  return JSON.stringify({ total: images.length, images: images.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
