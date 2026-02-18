/**
 * The Guardian Scraper
 *
 * Extract global news articles, long-form journalism, and live blog updates from T
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx theguardian-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.theguardian.com/world");
await page.content();

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("[data-link-name='article']").forEach(el => {
    const headline = el.querySelector(".js-headline-text, h3 span")?.textContent?.trim();
    const link = el.href || el.querySelector("a")?.href;
    const kicker = el.querySelector(".fc-item__kicker")?.textContent?.trim();
    if (headline) articles.push({ headline, link, kicker });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
