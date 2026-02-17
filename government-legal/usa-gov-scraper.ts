/**
 * USA.gov Scraper
 *
 * Extract government service directories, agency contact info, benefit programs, a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx usa-gov-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.usa.gov/agency-index");
await page.content();

const data = await page.evaluate(`(() => {
  const agencies = [];
  document.querySelectorAll(".agency-list li").forEach(el => {
    const name = el.querySelector("a")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    const description = el.querySelector(".description")?.textContent?.trim();
    if (name) agencies.push({ name, link, description: description?.slice(0, 200) });
  });
  return JSON.stringify({ total: agencies.length, agencies: agencies.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
