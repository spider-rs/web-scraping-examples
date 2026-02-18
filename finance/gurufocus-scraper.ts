/**
 * GuruFocus Scraper
 *
 * Track guru investor portfolios, value stock screeners, and intrinsic value calcu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx gurufocus-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.gurufocus.com/guru/warren+buffett/stock-picks");
await page.content();

const data = await page.evaluate(`(() => {
  const holdings = [];
  document.querySelectorAll("table.stock-picks tbody tr").forEach(el => {
    const stock = el.querySelector("td:nth-child(1) a")?.textContent?.trim();
    const weight = el.querySelector("td:nth-child(2)")?.textContent?.trim();
    const shares = el.querySelector("td:nth-child(3)")?.textContent?.trim();
    const action = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    if (stock) holdings.push({ stock, weight, shares, action });
  });
  return JSON.stringify({ total: holdings.length, holdings: holdings.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
