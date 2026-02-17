/**
 * ABC News Scraper
 *
 * Extract news articles, video clips, and live event coverage from ABC News includ
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx abcnews-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://abcnews.go.com/US");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".ContentRoll__Item, .ContentList__Item").forEach(el => {
    const headline = el.querySelector("h2, .ContentRoll__Headline")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    const desc = el.querySelector(".ContentRoll__Desc")?.textContent?.trim();
    if (headline) articles.push({ headline, link, desc });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
