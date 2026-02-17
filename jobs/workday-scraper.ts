/**
 * Workday Scraper
 *
 * Extract enterprise job listings, locations, and application details from Workday
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx workday-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://amazon.wd5.myworkdayjobs.com/en-US/Amazon");
await page.content(15000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll("[data-automation-id='jobResults'] li").forEach(el => {
    const title = el.querySelector("[data-automation-id='jobTitle']")?.textContent?.trim();
    const location = el.querySelector("[data-automation-id='locations']")?.textContent?.trim();
    const posted = el.querySelector("[data-automation-id='postedOn']")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (title) jobs.push({ title, location, posted, link });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
