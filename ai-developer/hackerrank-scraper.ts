/**
 * HackerRank Scraper
 *
 * Extract coding challenges, contest standings, skill certifications, and company 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hackerrank-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.hackerrank.com/domains/algorithms");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const challenges = [];
  document.querySelectorAll(".challenge-list-item, [class*='ChallengeCard']").forEach(el => {
    const name = el.querySelector("h4, [class*='title']")?.textContent?.trim();
    const difficulty = el.querySelector("[class*='difficulty']")?.textContent?.trim();
    const successRate = el.querySelector("[class*='success-ratio']")?.textContent?.trim();
    const score = el.querySelector("[class*='score']")?.textContent?.trim();
    if (name) challenges.push({ name, difficulty, successRate, score });
  });
  return JSON.stringify({ total: challenges.length, challenges: challenges.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
