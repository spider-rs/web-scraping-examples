/**
 * GitLab Scraper
 *
 * Extract repository metadata, merge requests, pipeline statuses, and contributor 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gitlab-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://gitlab.com/explore/projects/trending");
await page.content();

const data = await page.evaluate(`(() => {
  const projects = [];
  document.querySelectorAll(".project-row").forEach(el => {
    const name = el.querySelector(".project-name")?.textContent?.trim();
    const desc = el.querySelector(".description")?.textContent?.trim();
    const stars = el.querySelector(".star-count")?.textContent?.trim();
    const forks = el.querySelector(".fork-count")?.textContent?.trim();
    const updated = el.querySelector("time")?.getAttribute("datetime");
    if (name) projects.push({ name, desc, stars, forks, updated });
  });
  return JSON.stringify({ total: projects.length, projects: projects.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
