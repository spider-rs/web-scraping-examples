/**
 * Twitch Social Scraper
 *
 * Extract live stream data, channel profiles, viewer counts, and category rankings
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx twitch-social-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.twitch.tv/directory");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const streams = [];
  document.querySelectorAll("[data-a-target='card-0'], [data-a-target='card-1'], article").forEach(el => {
    const title = el.querySelector("[data-a-target='preview-card-title-link']")?.textContent?.trim();
    const streamer = el.querySelector("[data-a-target='preview-card-channel-link']")?.textContent?.trim();
    const viewers = el.querySelector("[data-a-target='preview-card-viewer-count']")?.textContent?.trim();
    const category = el.querySelector("[data-a-target='preview-card-game-link']")?.textContent?.trim();
    if (title) streams.push({ title, streamer, viewers, category });
  });
  return JSON.stringify({ total: streams.length, streams: streams.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
