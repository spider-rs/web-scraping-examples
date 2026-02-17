/**
 * The Daily Beast Scraper
 *
 * Extract breaking news scoops, political commentary, pop culture coverage, and in
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx daily-beast-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.thedailybeast.com/category/politics");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article, .story-card, .StoryCard").forEach(el => {
    const headline = el.querySelector("h2 a, h3 a, .headline a")?.textContent?.trim();
    const link = el.querySelector("h2 a, h3 a, .headline a")?.getAttribute("href");
    const author = el.querySelector(".byline a, .author")?.textContent?.trim();
    const excerpt = el.querySelector(".dek, .excerpt")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author, excerpt });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
