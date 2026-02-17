/**
 * Bing Scraper
 *
 * Extracts web search results from Bing
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx search/bing-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto("https://www.bing.com/search?q=web+scraping+tools");
await page.waitForSelector("#b_results .b_algo", { timeout: 10000 });

const results = await page.evaluate(() => {
  const items = document.querySelectorAll("#b_results .b_algo");
  return Array.from(items).map((item) => ({
    title: item.querySelector("h2 a")?.textContent || "",
    url: item.querySelector("h2 a")?.getAttribute("href") || "",
    snippet: item.querySelector(".b_caption p")?.textContent || "",
  }));
});

console.log("Results found:", results.length);
results.slice(0, 5).forEach((r) => console.log(`- ${r.title}`));
await spider.close();
