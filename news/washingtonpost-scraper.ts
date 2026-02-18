/**
 * Washington Post Scraper
 *
 * Extract political news, investigations, and editorial content from The Washingto
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx washingtonpost-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.washingtonpost.com/politics/");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("[data-feature-id='homepage/story']").forEach(el => {
    const headline = el.querySelector("h2, h3")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    const author = el.querySelector("[data-qa='author-name']")?.textContent?.trim();
    if (headline) articles.push({ headline, link, author });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
