/**
 * LinkedIn Jobs Scraper
 *
 * Extracts job listings from LinkedIn Jobs search
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jobs/linkedin-jobs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.linkedin.com/jobs/search/?keywords=product+manager&location=New+York");
await page.waitForSelector(".jobs-search__results-list li", { timeout: 10000 });

const jobs = await page.evaluate(() => {
  const items = document.querySelectorAll(".jobs-search__results-list li");
  return Array.from(items).map((item) => ({
    title: item.querySelector(".base-search-card__title")?.textContent?.trim() || "",
    company: item.querySelector(".base-search-card__company-name")?.textContent?.trim() || "",
    location: item.querySelector(".job-search-card__location")?.textContent?.trim() || "",
  }));
});

console.log("Jobs found:", jobs.length);
jobs.slice(0, 5).forEach((j) => console.log(`- ${j.title} at ${j.company}`));
await spider.close();
