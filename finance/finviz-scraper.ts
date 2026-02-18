/**
 * Finviz Scraper
 *
 * Screen stocks by technical and fundamental criteria, analyze heat maps, and revi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx finviz-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://finviz.com/screener.ashx?v=111&f=cap_largeover,fa_pe_u20");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const stocks = [];
  document.querySelectorAll("table.screener_table tbody tr[valign='top']").forEach(el => {
    const ticker = el.querySelector("td:nth-child(2) a")?.textContent?.trim();
    const company = el.querySelector("td:nth-child(3) a")?.textContent?.trim();
    const sector = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    const marketCap = el.querySelector("td:nth-child(7)")?.textContent?.trim();
    const pe = el.querySelector("td:nth-child(8)")?.textContent?.trim();
    const price = el.querySelector("td:nth-child(9)")?.textContent?.trim();
    if (ticker) stocks.push({ ticker, company, sector, marketCap, pe, price });
  });
  return JSON.stringify({ total: stocks.length, stocks: stocks.slice(0, 20) });
})()`);

console.log(JSON.parse(data));
await spider.close();
