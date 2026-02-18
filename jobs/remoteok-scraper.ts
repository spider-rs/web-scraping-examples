/**
 * RemoteOK Scraper
 *
 * Extract remote job listings, salary ranges, and company tags from RemoteOK aggre
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx remoteok-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://remoteok.com/remote-dev-jobs");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const jobs = [];
  document.querySelectorAll("tr.job").forEach(el => {
    const title = el.querySelector("h2[itemprop='title']")?.textContent?.trim();
    const company = el.querySelector("h3[itemprop='name']")?.textContent?.trim();
    const salary = el.querySelector(".salary")?.textContent?.trim();
    const tags = [...el.querySelectorAll(".tag h3")].map(t => t.textContent?.trim());
    if (title) jobs.push({ title, company, salary, tags });
  });
  return JSON.stringify({ total: jobs.length, jobs: jobs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
