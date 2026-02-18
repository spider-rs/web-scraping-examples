/**
 * Duolingo Scraper
 *
 * Extract language course structures, skill trees, lesson units, and available lan
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx duolingo-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.duolingo.com/courses");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const languages = [];
  document.querySelectorAll("[data-test='course-card']").forEach(el => {
    const language = el.querySelector("h2")?.textContent?.trim();
    const learners = el.querySelector("[data-test='learner-count']")?.textContent?.trim();
    const fromLang = el.querySelector("[data-test='from-language']")?.textContent?.trim();
    if (language) languages.push({ language, learners, fromLang });
  });
  return JSON.stringify({ total: languages.length, languages: languages.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
