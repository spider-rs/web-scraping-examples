/**
 * Dimensions Scraper
 *
 * Extract research publications, grants, patents, clinical trials, and policy data
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx dimensions-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://app.dimensions.ai/discover/publication?search_mode=content&search_text=protein+folding");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const publications = [];
  document.querySelectorAll("[data-testid='result-row'], .result-item").forEach(el => {
    const title = el.querySelector("h3 a, .result-title a")?.textContent?.trim();
    const authors = el.querySelector(".result-authors, .authors-list")?.textContent?.trim();
    const source = el.querySelector(".result-source, .journal-name")?.textContent?.trim();
    const year = el.querySelector(".result-year, .pub-year")?.textContent?.trim();
    const citations = el.querySelector(".result-citations, .citation-badge")?.textContent?.trim();
    if (title) publications.push({ title, authors, source, year, citations });
  });
  return JSON.stringify({ total: publications.length, publications: publications.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
