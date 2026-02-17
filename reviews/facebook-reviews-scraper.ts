/**
 * Facebook Reviews Scraper
 *
 * Extract business page reviews, recommendations, and rating distributions from Fa
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx facebook-reviews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.facebook.com/Google/reviews/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const reviews = [];
  document.querySelectorAll("[role='article']").forEach(el => {
    const text = el.querySelector("[data-ad-preview='message']")?.textContent?.trim();
    const author = el.querySelector("h3 a")?.textContent?.trim();
    const time = el.querySelector("abbr")?.getAttribute("title");
    if (text) reviews.push({ author, text: text.slice(0, 300), time });
  });
  return JSON.stringify({ total: reviews.length, reviews: reviews.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
