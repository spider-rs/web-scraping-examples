/**
 * Slate Scraper
 *
 * Extract commentary articles, podcast transcripts, and advice columns from Slate 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx slate-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://slate.com/technology");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".topic-story, .story-card").forEach(el => {
    const headline = el.querySelector("h3 a, .topic-story__hed a")?.textContent?.trim();
    const link = el.querySelector("h3 a, .topic-story__hed a")?.href;
    const dek = el.querySelector(".topic-story__dek")?.textContent?.trim();
    const author = el.querySelector(".topic-story__byline a")?.textContent?.trim();
    if (headline) articles.push({ headline, link, dek, author });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
