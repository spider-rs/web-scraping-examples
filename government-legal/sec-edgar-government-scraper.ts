/**
 * SEC EDGAR Government Scraper
 *
 * Extract SEC filings, company financial reports, insider trading data, and regula
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx sec-edgar-government-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=apple&CIK=&type=10-K&dateb=&owner=include&count=10&search_text=&action=getcompany");
await page.content();

const data = await page.evaluate(`(() => {
  const filings = [];
  document.querySelectorAll("table.tableFile2 tbody tr").forEach(el => {
    const type = el.querySelector("td:nth-child(1)")?.textContent?.trim();
    const date = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    const company = el.querySelector("td:nth-child(2) a")?.textContent?.trim();
    const link = el.querySelector("td:nth-child(2) a")?.getAttribute("href");
    if (type) filings.push({ type, date, company, link });
  });
  return JSON.stringify({ total: filings.length, filings: filings.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
