/**
 * Healthline Scraper
 *
 * Scrapes nutrition articles from Healthline health information platform.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx health/healthline-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.healthline.com/nutrition");
await page.content();
const data = await page.evaluate(`(() => {
  const articles = Array.from(document.querySelectorAll('[data-test="article-card"]')).map(el => ({
    title: el.querySelector('[data-test="article-title"]')?.textContent?.trim(),
    summary: el.querySelector('[data-test="summary"]')?.textContent?.trim(),
    author: el.querySelector('[data-test="author"]')?.textContent?.trim(),
    date: el.querySelector('[data-test="date"]')?.textContent?.trim(),
  }));
  return JSON.stringify({ articles });
})()`);
console.log(JSON.parse(data));
await spider.close();
