/**
 * Google Scholar Scraper
 *
 * Extracts academic papers from Google Scholar search results
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx search/google-scholar-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://scholar.google.com/scholar?q=machine+learning");
await page.waitForSelector(".gs_r.gs_or.gs_scl", { timeout: 10000 });

const papers = await page.evaluate(() => {
  const items = document.querySelectorAll(".gs_r.gs_or.gs_scl");
  return Array.from(items).map((item) => ({
    title: item.querySelector(".gs_rt a")?.textContent || "",
    authors: item.querySelector(".gs_a")?.textContent || "",
    url: item.querySelector(".gs_rt a")?.getAttribute("href") || "",
  }));
});

console.log("Papers found:", papers.length);
papers.slice(0, 5).forEach((p) => console.log(`- ${p.title}`));
await spider.close();
