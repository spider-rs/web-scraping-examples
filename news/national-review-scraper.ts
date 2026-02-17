/**
 * National Review Scraper
 *
 * Extract conservative political commentary, policy analysis, culture coverage, an
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx national-review-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.nationalreview.com/corner/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .post-list-article").forEach(el => {
    const headline = el.querySelector("h2 a, h3 a, .post-list-article__title a")?.textContent?.trim();
    const link = el.querySelector("h2 a, h3 a, .post-list-article__title a")?.getAttribute("href");
    const author = el.querySelector(".byline a, .post-list-article__author a")?.textContent?.trim();
    const excerpt = el.querySelector(".excerpt, .post-list-article__excerpt")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, excerpt });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
