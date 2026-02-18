/**
 * Unsplash Scraper
 *
 * Extract high-resolution photo URLs, photographer credits, download counts, and t
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx unsplash-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://unsplash.com/s/photos/nature");
await page.content();

const data = await page.evaluate(`(() => {
  const photos = [];
  document.querySelectorAll("[data-testid='photo-grid-masonry'] figure").forEach(el => {
    const img = el.querySelector("img[srcset]");
    const src = img?.getAttribute("src");
    const alt = img?.getAttribute("alt");
    const photographer = el.querySelector("a[rel='nofollow']")?.textContent?.trim();
    if (src) photos.push({ src, alt, photographer });
  });
  return JSON.stringify({ total: photos.length, photos: photos.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
