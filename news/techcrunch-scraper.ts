/**
 * TechCrunch News Scraper
 *
 * Extract artificial intelligence news from TechCrunch — headline, summary, and author.
 * Scrapes TechCrunch AI section with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from post block elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx techcrunch-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://techcrunch.com/category/artificial-intelligence/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article.post-block").forEach(el => {
    const headline = el.querySelector("h2.post-block__title")?.textContent?.trim();
    const link = el.querySelector("a.post-block__title-link")?.href;
    const summary = el.querySelector(".post-block__content")?.textContent?.trim();
    if (headline) articles.push({ headline, link, summary });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
