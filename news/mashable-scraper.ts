/**
 * Mashable Scraper
 *
 * Extract social media trends, tech culture stories, and digital lifestyle content
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mashable-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://mashable.com/tech");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .post-card").forEach(el => {
    const headline = el.querySelector("h2 a, .post-card__title a")?.textContent?.trim();
    const link = el.querySelector("h2 a, .post-card__title a")?.href;
    const author = el.querySelector(".post-card__author, .byline a")?.textContent?.trim();
    const desc = el.querySelector(".post-card__excerpt")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, desc });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
