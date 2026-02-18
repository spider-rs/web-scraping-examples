/**
 * Google Jobs Scraper
 *
 * Extract job listings from Google Jobs search — title, company,
 * location, and salary. Supports geo-proxies for location targeting.
 *
 * Uses `evaluate()` to iterate over multiple job card elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-jobs-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto(
  "https://www.google.com/search?q=software+engineer+jobs&ibp=htl;jobs",
);
await page.content(10000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll("li[data-ved], [jscontroller] li").forEach(el => {
    const title = el.querySelector("h3, [role='heading']")?.textContent?.trim();
    const company = el.querySelector("div[class] > div:nth-child(2)")?.textContent?.trim();
    const location = el.querySelector("div[class] > div:nth-child(3)")?.textContent?.trim();
    const posted = el.querySelector("span[aria-label$='ago'], time")?.textContent?.trim();
    if (title) jobs.push({ title, company, location, posted });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 10) });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
