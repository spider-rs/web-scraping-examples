/**
 * The Verge News Scraper
 *
 * Extract tech news from The Verge — headline, summary, and publication date.
 * Scrapes The Verge tech section with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from article elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx verge-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.theverge.com/tech");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article.article-link").forEach(el => {
    const headline = el.querySelector(".headline")?.textContent?.trim();
    const link = el.querySelector("a.article-link")?.href;
    const summary = el.querySelector(".article-summary")?.textContent?.trim();
    if (headline) articles.push({ headline, link, summary });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
