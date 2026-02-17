/**
 * Ars Technica Scraper
 *
 * Extract in-depth technology analysis, science coverage, and gaming reviews from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx arstechnica-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://arstechnica.com/ai/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .article").forEach(el => {
    const headline = el.querySelector("h2 a")?.textContent?.trim();
    const link = el.querySelector("h2 a")?.href;
    const excerpt = el.querySelector(".excerpt")?.textContent?.trim();
    const author = el.querySelector("[itemprop='name'], .byline a")?.textContent?.trim();
    const comments = el.querySelector(".comment-count")?.textContent?.trim();
    if (headline) articles.push({ headline, link, excerpt, author, comments });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
