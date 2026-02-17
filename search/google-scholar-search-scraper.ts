/**
 * Google Scholar Search Scraper
 *
 * Extract academic papers, citations, author profiles, and publication data from G
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-scholar-search-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://scholar.google.com/scholar?q=machine+learning");
await page.content();

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll(".gs_r.gs_or.gs_scl").forEach(el => {
    const title = el.querySelector(".gs_rt a")?.textContent?.trim();
    const authors = el.querySelector(".gs_a")?.textContent?.trim();
    const snippet = el.querySelector(".gs_rs")?.textContent?.trim();
    const citations = el.querySelector(".gs_fl a:nth-child(3)")?.textContent?.trim();
    if (title) papers.push({ title, authors, snippet, citations });
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
