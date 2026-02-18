/**
 * Rest of World Scraper
 *
 * Extract global technology coverage from emerging markets, digital economy report
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx restofworld-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://restofworld.org/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .story-card").forEach(el => {
    const headline = el.querySelector("h2 a, h3 a, .headline a")?.textContent?.trim();
    const link = el.querySelector("h2 a, h3 a, .headline a")?.getAttribute("href");
    const author = el.querySelector(".byline a, .author")?.textContent?.trim();
    const region = el.querySelector(".region-tag, .category")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, region });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
