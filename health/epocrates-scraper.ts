/**
 * Epocrates Scraper
 *
 * Extract point-of-care drug references, dosing calculators, interaction checkers,
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx epocrates-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.epocrates.com/drugs");
await page.content();

const data = await page.evaluate(`(() => {
  const drugs = [];
  document.querySelectorAll(".drug-list-item, .drug-card").forEach(el => {
    const name = el.querySelector("h3, .drug-name a")?.textContent?.trim();
    const drugClass = el.querySelector(".drug-class")?.textContent?.trim();
    const link = el.querySelector("a")?.href;
    if (name) drugs.push({ name, drugClass, link });
  });
  return JSON.stringify({ total: drugs.length, drugs: drugs.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
