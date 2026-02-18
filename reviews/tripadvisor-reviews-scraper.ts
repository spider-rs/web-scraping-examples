/**
 * Tripadvisor Reviews Scraper
 *
 * Extract hotel and attraction reviews, traveler ratings, and detailed feedback fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx tripadvisor-reviews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.tripadvisor.com/Hotel_Review-g60763-d93450-Reviews-The_Peninsula_New_York-New_York_City_New_York.html");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const reviews = [];
  document.querySelectorAll("[data-automation='reviewCard']").forEach(el => {
    const title = el.querySelector("[data-automation='reviewTitle']")?.textContent?.trim();
    const text = el.querySelector("[data-automation='reviewText']")?.textContent?.trim();
    const rating = el.querySelector("[data-automation='reviewBubbleScore']")?.getAttribute("class");
    const date = el.querySelector("[data-automation='reviewDate']")?.textContent?.trim();
    if (title) reviews.push({ title, text: text?.slice(0, 300), rating, date });
  });
  return JSON.stringify({ total: reviews.length, reviews: reviews.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
