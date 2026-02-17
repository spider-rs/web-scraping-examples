/**
 * Snapchat Scraper
 *
 * Extract public Spotlight content, creator profiles, and trending stories from Sn
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx snapchat-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.snapchat.com/spotlight");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const snaps = [];
  document.querySelectorAll("[data-testid='spotlight-card']").forEach(el => {
    const creator = el.querySelector("[data-testid='creator-name']")?.textContent?.trim();
    const caption = el.querySelector("[data-testid='snap-caption']")?.textContent?.trim();
    const views = el.querySelector("[data-testid='view-count']")?.textContent?.trim();
    if (creator) snaps.push({ creator, caption, views });
  });
  return JSON.stringify({ total: snaps.length, snaps: snaps.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
