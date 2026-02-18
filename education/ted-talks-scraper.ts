/**
 * TED Talks Scraper
 *
 * Extract talk transcripts, speaker profiles, topic tags, view counts, and event d
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ted-talks-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.ted.com/talks?sort=popular&language=en");

const data = await page.evaluate(`(() => {
  const talks = [];
  document.querySelectorAll("[data-testid='talk-card']").forEach(el => {
    const title = el.querySelector("h3")?.textContent?.trim();
    const speaker = el.querySelector("[data-testid='talk-card-speaker']")?.textContent?.trim();
    const duration = el.querySelector("[data-testid='talk-card-duration']")?.textContent?.trim();
    const views = el.querySelector("[data-testid='talk-card-views']")?.textContent?.trim();
    if (title) talks.push({ title, speaker, duration, views });
  });
  return JSON.stringify({ total: talks.length, talks: talks.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
