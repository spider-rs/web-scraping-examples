/**
 * Semantic Scholar Scraper
 *
 * Extract paper metadata, citation graphs, author profiles, and AI-generated summa
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx semantic-scholar-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.semanticscholar.org/search?q=large+language+models&sort=relevance");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll("[data-test-id='search-result']").forEach(el => {
    const title = el.querySelector("[data-test-id='title-link']")?.textContent?.trim();
    const authors = el.querySelector("[data-test-id='author-list']")?.textContent?.trim();
    const year = el.querySelector("[data-test-id='paper-year']")?.textContent?.trim();
    const citations = el.querySelector("[data-test-id='citation-count']")?.textContent?.trim();
    const tldr = el.querySelector("[data-test-id='tldr']")?.textContent?.trim();
    if (title) papers.push({ title, authors, year, citations, tldr });
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
