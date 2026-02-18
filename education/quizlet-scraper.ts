/**
 * Quizlet Scraper
 *
 * Extract flashcard sets, study terms, definitions, user-created collections, and 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx quizlet-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://quizlet.com/subjects/science/biology");

const data = await page.evaluate(`(() => {
  const sets = [];
  document.querySelectorAll(".SetPreview").forEach(el => {
    const title = el.querySelector(".SetPreview-title")?.textContent?.trim();
    const terms = el.querySelector(".SetPreview-termCount")?.textContent?.trim();
    const creator = el.querySelector(".SetPreview-creator")?.textContent?.trim();
    const rating = el.querySelector(".SetPreview-rating")?.textContent?.trim();
    if (title) sets.push({ title, terms, creator, rating });
  });
  return JSON.stringify({ total: sets.length, sets: sets.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
