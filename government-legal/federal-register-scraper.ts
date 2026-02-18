/**
 * Federal Register Scraper
 *
 * Extract proposed rules, final rules, presidential documents, and agency notices 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx federal-register-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.federalregister.gov/documents/search?conditions%5Btype%5D%5B%5D=RULE");
await page.content();

const data = await page.evaluate(`(() => {
  const docs = [];
  document.querySelectorAll(".document-wrapper").forEach(el => {
    const title = el.querySelector("h5 a")?.textContent?.trim();
    const agency = el.querySelector(".metadata .agency")?.textContent?.trim();
    const date = el.querySelector(".metadata .date")?.textContent?.trim();
    const type = el.querySelector(".metadata .type")?.textContent?.trim();
    if (title) docs.push({ title, agency, date, type });
  });
  return JSON.stringify({ total: docs.length, docs: docs.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
