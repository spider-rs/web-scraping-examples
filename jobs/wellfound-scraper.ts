/**
 * Wellfound Scraper
 *
 * Extracts startup job listings from Wellfound
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jobs/wellfound-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.wellfound.com/role/r/software-engineer");
await page.waitForSelector(".job-listing", { timeout: 10000 });

const jobs = await page.evaluate(() => {
  const items = document.querySelectorAll(".job-listing");
  return Array.from(items).map((item) => ({
    title: item.querySelector(".job-title")?.textContent?.trim() || "",
    company: item.querySelector(".company-name")?.textContent?.trim() || "",
    equity: item.querySelector(".equity-badge")?.textContent?.trim() || "",
  }));
});

console.log("Jobs found:", jobs.length);
jobs.slice(0, 5).forEach((j) => console.log(`- ${j.title} at ${j.company}`));
await spider.close();
