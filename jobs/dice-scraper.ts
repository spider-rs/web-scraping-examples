/**
 * Dice Scraper
 *
 * Extracts tech job listings from Dice
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx jobs/dice-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.dice.com/jobs?q=React+Developer&location=Remote");
await page.waitForSelector("[data-cy='search-card']", { timeout: 10000 });

const jobs = await page.evaluate(() => {
  const items = document.querySelectorAll("[data-cy='search-card']");
  return Array.from(items).map((item) => ({
    title: item.querySelector("[data-cy='job-title']")?.textContent?.trim() || "",
    company: item.querySelector("[data-cy='company-name']")?.textContent?.trim() || "",
    location: item.querySelector("[data-cy='job-location']")?.textContent?.trim() || "",
  }));
});

console.log("Jobs found:", jobs.length);
jobs.slice(0, 5).forEach((j) => console.log(`- ${j.title} at ${j.company}`));
await spider.close();
