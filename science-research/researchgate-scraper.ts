/**
 * ResearchGate Scraper
 *
 * Extract researcher profiles, publication lists, citation metrics, and project da
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx researchgate-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.researchgate.net/search/publication?q=transformer+architecture");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll("[class*='search-result']").forEach(el => {
    const title = el.querySelector("a[class*='publication-title']")?.textContent?.trim();
    const authors = el.querySelector("[class*='authors']")?.textContent?.trim();
    const citations = el.querySelector("[class*='citation-count']")?.textContent?.trim();
    const journal = el.querySelector("[class*='journal-name']")?.textContent?.trim();
    if (title) papers.push({ title, authors, citations, journal });
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
