/**
 * Google Finance Scraper
 *
 * Scrapes stock details from Google Finance using evaluate for robust extraction.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finance/google-finance-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.init();
const page = spider.page!;

await page.goto("https://www.google.com/finance/quote/AAPL:NASDAQ");
await page.content();

const data = await page.evaluate(`(() => {
  const result = {};
  result.price = document.querySelector("[data-last-price], [jsname='Fe7oBc'] span[jsname]")?.textContent?.trim()
    || document.querySelector("div[class] > span[jsname]")?.textContent?.trim();
  result.change = document.querySelector("[jsname='Fe7oBc'] [aria-label]")?.getAttribute("aria-label")
    || document.querySelector("[jsname='qRSVye']")?.textContent?.trim();
  const aboutRows = document.querySelectorAll("table tr, div[class] > div[class]:has(> div:nth-child(2))");
  aboutRows.forEach(row => {
    const label = row.querySelector("td:first-child, div:first-child")?.textContent?.trim()?.toLowerCase();
    const value = row.querySelector("td:last-child, div:last-child")?.textContent?.trim();
    if (label?.includes("market cap")) result.marketCap = value;
    if (label?.includes("p/e")) result.peRatio = value;
    if (label?.includes("dividend")) result.dividend = value;
    if (label?.includes("52-week") || label?.includes("52 wk")) result.range52w = value;
  });
  return JSON.stringify(result);
})()`);

console.log(JSON.parse(data));
await spider.close();
