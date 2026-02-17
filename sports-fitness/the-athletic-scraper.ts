/**
 * The Athletic Scraper
 *
 * Extract sports journalism articles, in-depth analysis, and insider coverage from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx the-athletic-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.nytimes.com/athletic/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, [data-testid='article-card']").forEach(el => {
    const headline = el.querySelector("h2, h3, [class*='headline']")?.textContent?.trim();
    const author = el.querySelector("[class*='author'], [class*='byline']")?.textContent?.trim();
    const category = el.querySelector("[class*='label'], [class*='tag']")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (headline) articles.push({ headline, author, category, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
