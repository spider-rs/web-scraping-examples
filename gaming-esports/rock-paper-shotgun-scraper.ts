/**
 * Rock Paper Shotgun Scraper
 *
 * Extract PC gaming news, reviews, guides, and hardware coverage from Rock Paper S
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rock-paper-shotgun-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.rockpapershotgun.com/reviews");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".summary_list_item, article").forEach(el => {
    const title = el.querySelector("h2 a, .title a")?.textContent?.trim();
    const author = el.querySelector(".author, .byline a")?.textContent?.trim();
    const date = el.querySelector("time")?.getAttribute("datetime");
    const excerpt = el.querySelector("p.synopsis, .strapline")?.textContent?.trim();
    const link = el.querySelector("h2 a, .title a")?.getAttribute("href");
    if (title) articles.push({ title, author, date, excerpt, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
