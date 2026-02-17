/**
 * CK-12 Scraper
 *
 * Extract K-12 textbook chapters, interactive simulations, practice exercises, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ck12-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.ck12.org/browse/");

const data = await page.evaluate(`(() => {
  const subjects = [];
  document.querySelectorAll(".subject-card").forEach(el => {
    const name = el.querySelector(".subject-title")?.textContent?.trim();
    const concepts = el.querySelector(".concept-count")?.textContent?.trim();
    const description = el.querySelector(".subject-description")?.textContent?.trim();
    const grades = el.querySelector(".grade-range")?.textContent?.trim();
    if (name) subjects.push({ name, concepts, description, grades });
  });
  return JSON.stringify({ total: subjects.length, subjects: subjects.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
