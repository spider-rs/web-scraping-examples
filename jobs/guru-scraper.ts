/**
 * Guru Scraper
 *
 * Collect freelance project listings, employer budgets, and required skills from G
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx guru-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.guru.com/d/jobs/q/python-developer/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll(".jobRecord").forEach(el => {
    const title = el.querySelector("h2 a")?.textContent?.trim();
    const budget = el.querySelector(".budget")?.textContent?.trim();
    const skills = [...el.querySelectorAll(".skillsList a")].map(s => s.textContent?.trim());
    const posted = el.querySelector(".postDate")?.textContent?.trim();
    if (title) jobs.push({ title, budget, skills, posted });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
