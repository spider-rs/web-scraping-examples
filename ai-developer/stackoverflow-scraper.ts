/**
 * Stack Overflow Scraper
 *
 * Scrapes web scraping questions from Stack Overflow community.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ai-developer/stackoverflow-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://stackoverflow.com/questions/tagged/web-scraping?sort=votes");
await page.content();
const data = await page.evaluate(`(() => {
  const questions = Array.from(document.querySelectorAll('.s-post-summary')).map(el => ({
    title: el.querySelector('.s-link')?.textContent?.trim(),
    votes: el.querySelector('.s-user-card--time .s-badge')?.textContent?.trim(),
    answers: el.querySelector('[data-test="answers-count"]')?.textContent?.trim(),
    views: el.querySelector('[data-test="views-count"]')?.textContent?.trim(),
    tags: Array.from(el.querySelectorAll('.post-tag')).map(t => t.textContent?.trim()),
  }));
  return JSON.stringify({ questions });
})()`);
console.log(JSON.parse(data));
await spider.close();
