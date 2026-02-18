/**
 * Peloton Scraper
 *
 * Extract workout class catalogs, instructor profiles, equipment specifications, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx peloton-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.onepeloton.com/classes");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const classes = [];
  document.querySelectorAll(".class-card, [data-test-id='class-card']").forEach(el => {
    const title = el.querySelector("h3, .class-title")?.textContent?.trim();
    const instructor = el.querySelector(".instructor-name, [data-test-id='instructor']")?.textContent?.trim();
    const duration = el.querySelector(".class-duration, [data-test-id='duration']")?.textContent?.trim();
    const difficulty = el.querySelector(".class-difficulty, [data-test-id='difficulty']")?.textContent?.trim();
    if (title) classes.push({ title, instructor, duration, difficulty });
  });
  return JSON.stringify({ total: classes.length, classes: classes.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
