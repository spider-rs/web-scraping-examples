/**
 * Medium Tech Scraper
 *
 * Extract technology articles, clap counts, reading times, and publication data fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx medium-tech-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://medium.com/tag/programming/recommended");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article").forEach(el => {
    const title = el.querySelector("h2")?.textContent?.trim();
    const author = el.querySelector("[data-testid='authorName']")?.textContent?.trim();
    const readTime = el.querySelector("[class*='readingTime']")?.textContent?.trim();
    const claps = el.querySelector("[data-testid='clapCount']")?.textContent?.trim();
    const link = el.querySelector("a[data-testid='postPreview']")?.getAttribute("href");
    if (title) articles.push({ title, author, readTime, claps, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
