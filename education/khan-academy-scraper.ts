/**
 * Khan Academy Scraper
 *
 * Extract lesson libraries, exercise sets, progress structures, and subject hierar
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx khan-academy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.khanacademy.org/math/algebra");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const units = [];
  document.querySelectorAll("[data-test-id='unit-header']").forEach(el => {
    const title = el.querySelector("h2")?.textContent?.trim();
    const lessons = el.closest("[data-test-id='unit-block']")?.querySelectorAll("[data-test-id='lesson-link']").length;
    const description = el.querySelector("p")?.textContent?.trim();
    if (title) units.push({ title, lessons, description });
  });
  return JSON.stringify({ total: units.length, units: units.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
