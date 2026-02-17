/**
 * LexisNexis Scraper
 *
 * Extract legal research results, case citations, statutory references, and news a
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx lexisnexis-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.lexisnexis.com/en-us/practice-areas.page");
await page.content(12000);

const data = await page.evaluate(`(() => {
  const areas = [];
  document.querySelectorAll(".practice-area-card").forEach(el => {
    const name = el.querySelector(".card-title")?.textContent?.trim();
    const description = el.querySelector(".card-description")?.textContent?.trim();
    const link = el.querySelector("a")?.getAttribute("href");
    if (name) areas.push({ name, description: description?.slice(0, 200), link });
  });
  return JSON.stringify({ total: areas.length, areas: areas.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
