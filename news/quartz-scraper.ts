/**
 * Quartz Scraper
 *
 * Extract global business news, economic trend analysis, and data-driven journalis
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx quartz-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://qz.com/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .article-card").forEach(el => {
    const headline = el.querySelector("h2 a, h3 a")?.textContent?.trim();
    const link = el.querySelector("h2 a, h3 a")?.getAttribute("href");
    const author = el.querySelector(".byline a, .author")?.textContent?.trim();
    const summary = el.querySelector("p, .excerpt")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, summary });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
