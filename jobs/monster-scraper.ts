/**
 * Monster Scraper
 *
 * Extracts job listings from Monster Jobs
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jobs/monster-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.monster.com/jobs/search?q=DevOps+Engineer&where=Chicago%2C+IL");
await page.waitForSelector(".job-card", { timeout: 10000 });

const jobs = await page.evaluate(() => {
  const items = document.querySelectorAll(".job-card");
  return Array.from(items).map((item) => ({
    title: item.querySelector(".job-card-title")?.textContent?.trim() || "",
    company: item.querySelector(".job-card-company")?.textContent?.trim() || "",
    location: item.querySelector(".job-card-location")?.textContent?.trim() || "",
  }));
});

console.log("Jobs found:", jobs.length);
jobs.slice(0, 5).forEach((j) => console.log(`- ${j.title} at ${j.company}`));
await spider.close();
