/**
 * Papers With Code Scraper
 *
 * Extract ML paper benchmarks, implementation links, dataset references, and SOTA 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx paperswithcode-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://paperswithcode.com/greatest");
await page.content();

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll(".row.infinite-item").forEach(el => {
    const title = el.querySelector("h1 a")?.textContent?.trim();
    const stars = el.querySelector(".entity-stars .badge")?.textContent?.trim();
    const repo = el.querySelector(".item-github-link a")?.getAttribute("href");
    const abstract = el.querySelector(".item-strip-abstract")?.textContent?.trim();
    if (title) papers.push({ title, stars, repo, abstract: abstract?.slice(0, 200) });
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
