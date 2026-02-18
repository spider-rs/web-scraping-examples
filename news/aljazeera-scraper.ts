/**
 * Al Jazeera Scraper
 *
 * Extract international news coverage, feature articles, and live blog updates fro
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx aljazeera-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.aljazeera.com/news/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article.gc").forEach(el => {
    const headline = el.querySelector("h3.gc__title a, .gc__title span")?.textContent?.trim();
    const link = el.querySelector("a.u-clickable-card__link")?.href;
    const excerpt = el.querySelector(".gc__excerpt p")?.textContent?.trim();
    const date = el.querySelector(".date-simple")?.textContent?.trim();
    if (headline) articles.push({ headline, link, excerpt, date });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
