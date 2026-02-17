/**
 * Twitch Gaming Scraper
 *
 * Extract live stream data, channel info, viewer counts, and category listings fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx twitch-gaming-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.twitch.tv/directory/category/league-of-legends");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const streams = [];
  document.querySelectorAll("[data-a-target='card-0'], [data-a-target*='card-']").forEach(el => {
    const title = el.querySelector("[data-a-target='preview-card-title-link'] h3")?.textContent?.trim();
    const channel = el.querySelector("[data-a-target='preview-card-channel-link'] p")?.textContent?.trim();
    const viewers = el.querySelector(".tw-media-card-stat")?.textContent?.trim();
    if (title) streams.push({ title, channel, viewers });
  });
  return JSON.stringify({ total: streams.length, streams: streams.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
