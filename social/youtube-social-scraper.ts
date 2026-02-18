/**
 * YouTube Social Scraper
 *
 * Extract video metadata, channel statistics, comments, and playlist data from You
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx youtube-social-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.youtube.com/@NASA/videos");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const videos = [];
  document.querySelectorAll("ytd-rich-item-renderer").forEach(el => {
    const title = el.querySelector("#video-title")?.textContent?.trim();
    const views = el.querySelector("#metadata-line span:first-child")?.textContent?.trim();
    const date = el.querySelector("#metadata-line span:last-child")?.textContent?.trim();
    const link = el.querySelector("a#thumbnail")?.getAttribute("href");
    if (title) videos.push({ title, views, date, link });
  });
  return JSON.stringify({ total: videos.length, videos: videos.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
