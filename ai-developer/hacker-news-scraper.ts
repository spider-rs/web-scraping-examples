/**
 * Hacker News Scraper
 *
 * Extract front-page stories, point scores, comment counts, and submission metadat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hacker-news-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://news.ycombinator.com/");

const data = await page.evaluate(`(() => {
  const stories = [];
  document.querySelectorAll(".athing").forEach(el => {
    const rank = el.querySelector(".rank")?.textContent?.trim();
    const title = el.querySelector(".titleline a")?.textContent?.trim();
    const url = el.querySelector(".titleline a")?.getAttribute("href");
    const site = el.querySelector(".sitestr")?.textContent?.trim();
    const subline = el.nextElementSibling;
    const points = subline?.querySelector(".score")?.textContent?.trim();
    const author = subline?.querySelector(".hnuser")?.textContent?.trim();
    const comments = subline?.querySelector("a[href*='item']")?.textContent?.trim();
    if (title) stories.push({ rank, title, url, site, points, author, comments });
  });
  return JSON.stringify({ total: stories.length, stories: stories.slice(0, 30) });
})()`);

console.log(JSON.parse(data));
await spider.close();
