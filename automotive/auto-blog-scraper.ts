/**
 * Auto Blog Scraper
 *
 * Extract Autoblog news articles, new car reviews, pricing research, and used car 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx auto-blog-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.autoblog.com/reviews/");
await page.content();

const data = await page.evaluate(`(() => {
  const reviews = [];
  document.querySelectorAll(".river-item").forEach(el => {
    const title = el.querySelector("h2 a")?.textContent?.trim();
    const url = el.querySelector("h2 a")?.getAttribute("href");
    const author = el.querySelector(".byline a")?.textContent?.trim();
    const date = el.querySelector(".date")?.textContent?.trim();
    const summary = el.querySelector(".river-item__body p")?.textContent?.trim();
    if (title) reviews.push({ title, url, author, date, summary });
  });
  return JSON.stringify({ total: reviews.length, reviews: reviews.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
