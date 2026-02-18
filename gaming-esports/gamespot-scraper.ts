/**
 * GameSpot Scraper
 *
 * Extract game reviews, news, video content, and editorial coverage from GameSpot 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gamespot-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.gamespot.com/reviews/");
await page.content();

const data = await page.evaluate(`(() => {
  const reviews = [];
  document.querySelectorAll(".media-body").forEach(el => {
    const title = el.querySelector("h4 a")?.textContent?.trim();
    const score = el.querySelector(".review-ring-score__score")?.textContent?.trim();
    const date = el.querySelector("time")?.getAttribute("datetime");
    const deck = el.querySelector(".media-deck")?.textContent?.trim();
    if (title) reviews.push({ title, score, date, deck });
  });
  return JSON.stringify({ total: reviews.length, reviews: reviews.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
