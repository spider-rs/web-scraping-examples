/**
 * Psychology Today Scraper
 *
 * Extract therapist directories, psychology articles, treatment approaches, and me
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx psychology-today-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.psychologytoday.com/us/therapists/new-york-ny");
await page.content();

const data = await page.evaluate(`(() => {
  const therapists = [];
  document.querySelectorAll(".results-row, .profile-card").forEach(el => {
    const name = el.querySelector(".profile-title, h2 a")?.textContent?.trim();
    const credentials = el.querySelector(".profile-subtitle")?.textContent?.trim();
    const specialties = el.querySelector(".profile-specialties")?.textContent?.trim();
    const location = el.querySelector(".profile-location")?.textContent?.trim();
    if (name) therapists.push({ name, credentials, specialties, location });
  });
  return JSON.stringify({ total: therapists.length, therapists: therapists.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
