/**
 * Connected Papers Scraper
 *
 * Extract paper similarity graphs, citation connections, prior and derivative work
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx connected-papers-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.connectedpapers.com/search?q=attention+mechanism");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll("[data-testid='search-result'], .paper-search-result").forEach(el => {
    const title = el.querySelector("h3, .paper-title")?.textContent?.trim();
    const authors = el.querySelector(".paper-authors")?.textContent?.trim();
    const year = el.querySelector(".paper-year")?.textContent?.trim();
    const citations = el.querySelector(".paper-citations")?.textContent?.trim();
    const venue = el.querySelector(".paper-venue")?.textContent?.trim();
    if (title) papers.push({ title, authors, year, citations, venue });
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
