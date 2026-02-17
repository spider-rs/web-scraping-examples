/**
 * IEEE Xplore Scraper
 *
 * Extract technical papers, conference proceedings, standards documents, and citat
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ieee-xplore-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=deep+learning");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll(".List-results-items").forEach(el => {
    const title = el.querySelector("h3 a, .result-item-title")?.textContent?.trim();
    const authors = el.querySelector(".author, .result-item-authors")?.textContent?.trim();
    const venue = el.querySelector(".publisher-info-container, .result-item-publisher")?.textContent?.trim();
    const year = el.querySelector(".publisher-info-container .year")?.textContent?.trim();
    const citations = el.querySelector("[class*='citation-count']")?.textContent?.trim();
    if (title) papers.push({ title, authors, venue, year, citations });
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
