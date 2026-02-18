/**
 * TikTok Social Scraper
 *
 * Extract video metadata, creator profiles, engagement metrics, and trending sound
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tiktok-social-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.tiktok.com/@nasa");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const videos = [];
  document.querySelectorAll("[data-e2e='user-post-item']").forEach(el => {
    const caption = el.querySelector("[data-e2e='video-desc']")?.textContent?.trim();
    const views = el.querySelector("[data-e2e='video-views']")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (caption || views) videos.push({ caption: caption?.slice(0, 200), views, link });
  });
  return JSON.stringify({ total: videos.length, videos: videos.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
