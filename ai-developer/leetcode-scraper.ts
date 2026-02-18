/**
 * LeetCode Scraper
 *
 * Extract coding problems, difficulty ratings, acceptance rates, and solution disc
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx leetcode-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://leetcode.com/problemset/");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const problems = [];
  document.querySelectorAll("[role='row']").forEach(el => {
    const title = el.querySelector("a[href*='/problems/']")?.textContent?.trim();
    const difficulty = el.querySelector("[class*='difficulty']")?.textContent?.trim();
    const acceptance = el.querySelector("[class*='acceptance']")?.textContent?.trim();
    const link = el.querySelector("a[href*='/problems/']")?.getAttribute("href");
    if (title) problems.push({ title, difficulty, acceptance, link });
  });
  return JSON.stringify({ total: problems.length, problems: problems.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
