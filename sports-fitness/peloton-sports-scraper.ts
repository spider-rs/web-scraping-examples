/**
 * Peloton Sports Scraper
 *
 * Extract Peloton class listings, instructor info, workout types, and class schedu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx peloton-sports-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.onepeloton.com/classes");
await page.content();

const data = await page.evaluate(`(() => {
  const classes = [];
  document.querySelectorAll("[class*='class-card'], [class*='ClassCard']").forEach(el => {
    const title = el.querySelector("[class*='class-name'], [class*='title']")?.textContent?.trim();
    const instructor = el.querySelector("[class*='instructor'], [class*='Instructor']")?.textContent?.trim();
    const duration = el.querySelector("[class*='duration'], [class*='Duration']")?.textContent?.trim();
    const difficulty = el.querySelector("[class*='difficulty'], [class*='Difficulty']")?.textContent?.trim();
    const classType = el.querySelector("[class*='category'], [class*='type']")?.textContent?.trim();
    if (title) classes.push({ title, instructor, duration, difficulty, classType });
  });
  return JSON.stringify({ total: classes.length, classes: classes.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
