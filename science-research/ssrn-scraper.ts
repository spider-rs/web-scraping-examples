/**
 * SSRN Scraper
 *
 * Extract social science research papers, download counts, author rankings, and ab
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ssrn-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://papers.ssrn.com/sol3/results.cfm?RequestTimeout=50000000&txtKey_Words=fintech");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll(".result-item, .paper-result").forEach(el => {
    const title = el.querySelector(".title a, .result-title a")?.textContent?.trim();
    const authors = el.querySelector(".authors, .result-authors")?.textContent?.trim();
    const downloads = el.querySelector(".download-count, .result-downloads")?.textContent?.trim();
    const date = el.querySelector(".date, .result-date")?.textContent?.trim();
    if (title) papers.push({ title, authors, downloads, date });
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
