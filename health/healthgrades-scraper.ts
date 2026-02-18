/**
 * Healthgrades Scraper
 *
 * Extract physician profiles, hospital ratings, patient satisfaction scores, and q
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx healthgrades-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.healthgrades.com/find-a-doctor/dermatologist/new-york-ny");
await page.content();

const data = await page.evaluate(`(() => {
  const doctors = [];
  document.querySelectorAll("[data-qa-target='provider-card']").forEach(el => {
    const name = el.querySelector("[data-qa-target='provider-name']")?.textContent?.trim();
    const specialty = el.querySelector("[data-qa-target='provider-specialty']")?.textContent?.trim();
    const rating = el.querySelector("[data-qa-target='provider-rating']")?.textContent?.trim();
    const experience = el.querySelector("[data-qa-target='provider-experience']")?.textContent?.trim();
    if (name) doctors.push({ name, specialty, rating, experience });
  });
  return JSON.stringify({ total: doctors.length, doctors: doctors.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
