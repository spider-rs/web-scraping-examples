/**
 * Associated Press Scraper
 *
 * Extract wire service news, breaking stories, and photojournalism from the Associ
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx apnews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://apnews.com/world-news");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".PageList-items-item, .FeedCard").forEach(el => {
    const headline = el.querySelector("h2, h3, .CardHeadline")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    const timestamp = el.querySelector(".Timestamp")?.textContent?.trim();
    if (headline) articles.push({ headline, link, timestamp });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
