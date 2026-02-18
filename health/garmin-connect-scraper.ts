/**
 * Garmin Connect Scraper
 *
 * Extract fitness activity data, workout summaries, device specifications, and tra
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx garmin-connect-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://connect.garmin.com/features/");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const features = [];
  document.querySelectorAll(".feature-card, .card-content").forEach(el => {
    const title = el.querySelector("h2, h3")?.textContent?.trim();
    const description = el.querySelector("p")?.textContent?.trim();
    const icon = el.querySelector("img")?.getAttribute("alt");
    if (title) features.push({ title, description, icon });
  });
  return JSON.stringify({ total: features.length, features: features.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
