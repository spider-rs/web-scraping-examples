/**
 * SEC EDGAR Scraper
 *
 * Download SEC filings, 10-K annual reports, insider transactions, and company dis
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sec-edgar-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000320193&type=10-K&dateb=&owner=include&count=10");
await page.content();

const data = await page.evaluate(`(() => {
  const filings = [];
  document.querySelectorAll("table.tableFile2 tbody tr").forEach(el => {
    const type = el.querySelector("td:nth-child(1)")?.textContent?.trim();
    const description = el.querySelector("td:nth-child(2) a")?.textContent?.trim();
    const filed = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    const link = el.querySelector("td:nth-child(2) a")?.getAttribute("href");
    if (type) filings.push({ type, description, filed, link });
  });
  return JSON.stringify({ total: filings.length, filings });
})()`);

console.log(JSON.parse(data));
await spider.close();
