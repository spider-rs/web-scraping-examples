/**
 * CNN News Scraper
 *
 * Extract business and tech news from CNN — headline, description, and link.
 * Scrapes CNN's business/tech section with dynamic stealth browsing.
 *
 * Uses `evaluate()` to extract data from container item elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx cnn-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.cnn.com/business/tech");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".container__item").forEach(el => {
    const headline = el.querySelector(".container__headline-text")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    const description = el.querySelector(".container__description-text")?.textContent?.trim();
    if (headline) articles.push({ headline, link, description });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
