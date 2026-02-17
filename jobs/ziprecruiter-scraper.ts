/**
 * ZipRecruiter Scraper
 *
 * Extracts job listings from ZipRecruiter
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jobs/ziprecruiter-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.ziprecruiter.com/jobs-search?search=data+engineer&location=Austin%2C+TX");
await page.waitForSelector("[data-testid='jobcard']", { timeout: 10000 });

const jobs = await page.evaluate(() => {
  const items = document.querySelectorAll("[data-testid='jobcard']");
  return Array.from(items).map((item) => ({
    title: item.querySelector("[data-testid='job-title']")?.textContent?.trim() || "",
    company: item.querySelector("[data-testid='company']")?.textContent?.trim() || "",
    location: item.querySelector("[data-testid='location']")?.textContent?.trim() || "",
  }));
});

console.log("Jobs found:", jobs.length);
jobs.slice(0, 5).forEach((j) => console.log(`- ${j.title} at ${j.company}`));
await spider.close();
