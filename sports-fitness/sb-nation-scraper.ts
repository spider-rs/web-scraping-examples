/**
 * SB Nation Scraper
 *
 * Extract sports news, team-specific coverage, and community content from SB Natio
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sb-nation-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.sbnation.com/nba");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".c-entry-box--compact, .c-compact-river__entry").forEach(el => {
    const headline = el.querySelector(".c-entry-box--compact__title a, h2 a")?.textContent?.trim();
    const author = el.querySelector(".c-byline a")?.textContent?.trim();
    const time = el.querySelector("time")?.getAttribute("datetime");
    const link = el.querySelector(".c-entry-box--compact__title a, h2 a")?.getAttribute("href");
    if (headline) articles.push({ headline, author, time, link });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
