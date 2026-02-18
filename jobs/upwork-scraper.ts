/**
 * Upwork Scraper
 *
 * Capture freelance job postings, client budgets, and skill requirements from Upwo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx upwork-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.upwork.com/nx/search/jobs/?q=react+developer&sort=recency");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll("[data-test='job-tile-list'] section").forEach(el => {
    const title = el.querySelector("[data-test='job-tile-title'] a")?.textContent?.trim();
    const budget = el.querySelector("[data-test='budget']")?.textContent?.trim();
    const skills = [...el.querySelectorAll("[data-test='token'] span")].map(s => s.textContent?.trim());
    const posted = el.querySelector("[data-test='posted-on']")?.textContent?.trim();
    if (title) jobs.push({ title, budget, skills, posted });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
