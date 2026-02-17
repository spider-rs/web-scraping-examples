/**
 * The Economist Scraper
 *
 * Extract economic analysis, policy briefings, and global affairs coverage from Th
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx economist-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.economist.com/finance-and-economics");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll("[data-test-id='Article'], .teaser").forEach(el => {
    const headline = el.querySelector("h3, .teaser__headline")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    const rubric = el.querySelector(".teaser__rubric, .teaser__text")?.textContent?.trim();
    const section = el.querySelector(".teaser__subheadline")?.textContent?.trim();
    if (headline) articles.push({ headline, link, rubric, section });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
