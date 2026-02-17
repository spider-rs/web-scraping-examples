/**
 * PubMed Health Scraper
 *
 * Extract biomedical literature citations, abstracts, author affiliations, and jou
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pubmed-health-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://pubmed.ncbi.nlm.nih.gov/?term=diabetes+treatment");

const data = await page.evaluate(`(() => {
  const articles = [];
  document.querySelectorAll(".docsum-content").forEach(el => {
    const title = el.querySelector(".docsum-title")?.textContent?.trim();
    const authors = el.querySelector(".docsum-authors")?.textContent?.trim();
    const journal = el.querySelector(".docsum-journal-citation")?.textContent?.trim();
    const pmid = el.closest("[data-docid]")?.getAttribute("data-docid");
    if (title) articles.push({ title, authors, journal, pmid });
  });
  return JSON.stringify({ total: articles.length, articles: articles.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
