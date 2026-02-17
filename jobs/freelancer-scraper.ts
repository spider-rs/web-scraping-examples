/**
 * Freelancer Scraper
 *
 * Extract project contests, bid ranges, and employer requirements from Freelancer.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx freelancer-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.freelancer.com/jobs/python/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const projects = [];
  document.querySelectorAll(".JobSearchCard-item").forEach(el => {
    const title = el.querySelector(".JobSearchCard-primary-heading a")?.textContent?.trim();
    const budget = el.querySelector(".JobSearchCard-primary-price")?.textContent?.trim();
    const bids = el.querySelector(".JobSearchCard-secondary-entry")?.textContent?.trim();
    const skills = [...el.querySelectorAll(".JobSearchCard-primary-tags a")].map(s => s.textContent?.trim());
    if (title) projects.push({ title, budget, bids, skills });
  });
  return JSON.stringify({ total: projects.length, projects: projects.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
