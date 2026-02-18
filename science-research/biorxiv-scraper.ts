/**
 * bioRxiv Scraper
 *
 * Extract biology preprints, abstracts, author data, and submission metadata from 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx biorxiv-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.biorxiv.org/search/genomics");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll(".search-result, .highwire-cite").forEach(el => {
    const title = el.querySelector(".highwire-cite-title a")?.textContent?.trim();
    const authors = el.querySelector(".highwire-cite-authors")?.textContent?.trim();
    const date = el.querySelector(".highwire-cite-metadata-date")?.textContent?.trim();
    const doi = el.querySelector(".highwire-cite-metadata-doi")?.textContent?.trim();
    if (title) papers.push({ title, authors, date, doi });
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
