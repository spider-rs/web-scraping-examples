/**
 * Google Scholar Science Scraper
 *
 * Extract academic papers, citation counts, author profiles, and related articles 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx google-scholar-science-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://scholar.google.com/scholar?q=attention+is+all+you+need");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll(".gs_r.gs_or.gs_scl").forEach(el => {
    const title = el.querySelector(".gs_rt a")?.textContent?.trim();
    const authors = el.querySelector(".gs_a")?.textContent?.trim();
    const snippet = el.querySelector(".gs_rs")?.textContent?.trim();
    const citations = el.querySelector(".gs_fl a:nth-child(3)")?.textContent?.trim();
    const link = el.querySelector(".gs_rt a")?.getAttribute("href");
    if (title) papers.push({ title, authors, snippet: snippet?.slice(0, 200), citations, link });
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
