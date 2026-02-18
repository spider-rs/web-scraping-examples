/**
 * TheStreet Scraper
 *
 * Pull stock analysis articles, Jim Cramer picks, and market commentary from TheSt
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx thestreet-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.thestreet.com/investing");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("article.story-card").forEach(el => {
    const title = el.querySelector("h3 a")?.textContent?.trim();
    const author = el.querySelector(".byline")?.textContent?.trim();
    const date = el.querySelector("time")?.textContent?.trim();
    const link = el.querySelector("h3 a")?.getAttribute("href");
    if (title) articles.push({ title, author, date, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
