/**
 * arXiv Scraper
 *
 * Extract preprint papers, abstracts, author lists, and citation metadata from arX
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx arxiv-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://arxiv.org/list/cs.AI/recent");
await page.content();

const data = await page.evaluate(`(() => {
  const papers = [];
  document.querySelectorAll("#dlpage dt, #dlpage dd").forEach((el, i, all) => {
    if (el.tagName === "DT") {
      const dd = all[i + 1];
      const title = dd?.querySelector(".list-title")?.textContent?.replace("Title:", "").trim();
      const authors = dd?.querySelector(".list-authors")?.textContent?.replace("Authors:", "").trim();
      const abstract = dd?.querySelector(".mathjax")?.textContent?.trim();
      const id = el.querySelector("a[title='Abstract']")?.textContent?.trim();
      if (title) papers.push({ id, title, authors, abstract: abstract?.slice(0, 200) });
    }
  });
  return JSON.stringify({ total: papers.length, papers: papers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
