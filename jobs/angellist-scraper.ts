/**
 * AngelList Scraper
 *
 * Extract startup job listings, equity compensation, and funding stage data from A
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx angellist-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://wellfound.com/role/r/frontend-developer");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const listings = [];
  document.querySelectorAll("[data-test='StartupResult']").forEach(el => {
    const startup = el.querySelector("[data-test='startup-name']")?.textContent?.trim();
    const title = el.querySelector("[data-test='job-name']")?.textContent?.trim();
    const salary = el.querySelector("[data-test='compensation']")?.textContent?.trim();
    const size = el.querySelector("[data-test='company-size']")?.textContent?.trim();
    const stage = el.querySelector("[data-test='funding-stage']")?.textContent?.trim();
    if (startup) listings.push({ startup, title, salary, size, stage });
  });
  return JSON.stringify({ total: listings.length, listings: listings.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
